import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { InvArticleModule } from './invarticle/invarticle.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule,
        BookmarkModule,
        InvArticleModule,
        PrismaModule
    ]
})
export class AppModule { }
