import { Body, Controller, HttpCode, HttpStatus, Post, ParseIntPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }

    // @Post('signin')
    // signin(
    //     @Body('email') email: string,
    //     @Body('password', ParseIntPipe) password: string
    // ) {
    //     console.log({
    //         email,
    //         typeOfEmail: typeof email,
    //         password,
    //         typeOfPassword: typeof password
    //     })
    //     return this.authService.signin()
    // }
}