import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { AuthDto } from "./dto"
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password)

        // save the new user to the database
        try {
            const user = await this.prisma.user.create({
                data: { email: dto.email, hash }
            })

            return this.signToken(user.id, user.email)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    throw new ForbiddenException("Credentials taken!")
                }
            }
            throw e
        }
    }

    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        // if user does not exist, throw an exception
        if (!user) throw new ForbiddenException("Credentials incorrect!")

        // verify the password
        const pwMatches = await argon.verify(user.hash, dto.password)

        // if password does not match, throw an exception
        if (!pwMatches) throw new ForbiddenException("Credentials incorrect!")

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const
            payload = { sub: userId, email },
            secret = this.config.get("JWT_SECRET"),
            token = await this.jwt.signAsync(payload, { expiresIn: "15m", secret: secret })
        return { access_token: token }
    }
}