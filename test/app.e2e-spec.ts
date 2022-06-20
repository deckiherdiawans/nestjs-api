import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as pactum from 'pactum'
import { PrismaService } from "../src/prisma/prisma.service"
import { AppModule } from "../src/app.module"
import { AuthDto } from "../src/auth/dto"
import { EditUserDto } from "../src/user/dto"
import { CreateBookmarkDto } from "../src/bookmark/dto"
import { EditBookmarkDto } from "../src/bookmark/dto/edit-bookmark.dto"

describe("App e2e", () => {
    let app: INestApplication, prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true
        }))
        await app.init()
        await app.listen(3333)

        prisma = app.get(PrismaService)
        await prisma.cleanDb()

        pactum.request.setBaseUrl("http://localhost:3333")
    })

    afterAll(() => { app.close() })

    describe('Auth', () => {
        const dto: AuthDto = {
            email: "d.herdiawan.s@gmail.com",
            password: "   "
        }

        describe('Signup', () => {
            it('Should throw if email is empty.', () => {
                return pactum.spec().post("/auth/signup").withBody({ password: dto.password }).expectStatus(400)
            })

            it('Should throw if password is empty.', () => {
                return pactum.spec().post("/auth/signup").withBody({ email: dto.email }).expectStatus(400)
            })

            it('Should throw if no one provided.', () => {
                return pactum.spec().post("/auth/signup").expectStatus(400)
            })

            it('Should signup.', () => {
                return pactum.spec().post("/auth/signup").withBody(dto).expectStatus(201).inspect()
            })
        })

        describe('Signin', () => {
            it('Should throw if email is empty.', () => {
                return pactum.spec().post("/auth/signin").withBody({ password: dto.password }).expectStatus(400)
            })

            it('Should throw if password is empty.', () => {
                return pactum.spec().post("/auth/signin").withBody({ email: dto.email }).expectStatus(400)
            })

            it('Should throw if no one provided.', () => {
                return pactum.spec().post("/auth/signin").expectStatus(400)
            })

            it('Should signin.', () => {
                return pactum.spec().post("/auth/signin").withBody(dto).expectStatus(200).stores("userAt", "access_token")
            })
        })
    })

    describe('User', () => {
        describe('Get me', () => {
            it('Should get current user.', () => {
                return pactum.spec().get("/users/me").withHeaders({ Authorization: "Bearer $S{userAt}" }).expectStatus(200)
            })
        })

        describe('Edit user', () => {
            it('Should edit user.', () => {
                const dto: EditUserDto = {
                    firstName: "Vladimir",
                    email: "vlad@codewithvlad.com"
                }
                return pactum.spec().patch("/users").withHeaders({ Authorization: "Bearer $S{userAt}" }).expectStatus(200)
            })
        })
    })

    describe('Bookmarks', () => {
        describe('Get empty bookmarks.', () => {
            it('Should get empty bookmarks.', () => {
                return pactum.spec().get("/bookmarks").withHeaders({ Authorization: "Bearer $S{userAt}" }).expectStatus(200)
            })
        })

        describe('Create bookmark.', () => {
            const dto: CreateBookmarkDto = {
                title: "First Bookmark",
                link: "https://www.youtube.com/watch?v=gp5H0Vw39yw"
            }

            it('Should create bookmark.', () => {
                return pactum.spec().post("/bookmarks").withHeaders({ Authorization: "Bearer $S{userAt}" }).withBody(dto).expectStatus(201).stores('bookmarkId', 'id')
            })
        })

        describe('Get bookmarks.', () => {
            it('Should get bookmarks.', () => {
                return pactum.spec().get("/bookmarks").withHeaders({ Authorization: "Bearer $S{userAt}" }).expectStatus(200)
            })
        })

        describe('Get bookmark by id.', () => {
            it('Should get bookmark by id.', () => {
                return pactum.spec().get("/bookmarks/{id}").withPathParams('id', '$S{bookmarkId}').withHeaders({ Authorization: "Bearer $S{userAt}" }).expectStatus(200).expectBodyContains('$S{bookmarkId}')
            })
        })

        describe('Edit bookmark by id.', () => {
            const dto: EditBookmarkDto = {
                title: "Learn TypeScript - Full Course for Beginners",
                description: "Learn the TypeScript programming language in this crash course for beginners. By the end of this course you will understand all modern TypeScript features."
            }

            it('Should edit bookmark by id.', () => {
                return pactum.spec().patch("/bookmarks/{id}").withPathParams('id', '$S{bookmarkId}').withHeaders({ Authorization: "Bearer $S{userAt}" }).withBody(dto).expectStatus(200)
            })
        })

        describe('Delete bookmark by id.', () => {
            it('Should delete bookmark by id.', () => {
                return pactum.spec().delete("/bookmarks/{id}").withPathParams('id', '$S{bookmarkId}').withHeaders({ Authorization: "Bearer $S{userAt}" }).expectStatus(200)
            })
        })
    })
})
