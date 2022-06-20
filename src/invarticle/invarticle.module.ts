import { Module } from '@nestjs/common';
import { InvArticleController } from './invarticle.controller';
import { InvArticleService } from './invarticle.service';

@Module({
    controllers: [InvArticleController],
    providers: [InvArticleService]
})
export class InvArticleModule { }
