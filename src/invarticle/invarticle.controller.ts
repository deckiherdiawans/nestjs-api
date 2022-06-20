import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { InvArticleService } from './invarticle.service'
import { CreateInvArticleDto } from './dto/create-invarticle.dto'
import { EditInvArticleDto } from './dto/edit-invarticle.dto'

@Controller('invarticle')
export class InvArticleController {
    constructor(private invArticleService: InvArticleService) { }

    @Get()
    getInvArticle() {
        return this.invArticleService.getInvArticle()
    }

    @Get(':articlecode')
    getInvArticleByArticleCode(@Param('articlecode', ParseIntPipe) invArticleId: number) {
        return this.invArticleService.getInvArticleByArticleCode(invArticleId)
    }

    @Post()
    createInvArticle(@Body() dto: CreateInvArticleDto) {
        return this.invArticleService.createInvArticle(dto)
    }

    @Patch(':articlecode')
    editInvArticleByArticleCode(
        @Param('articlecode', ParseIntPipe) invArticleId: number,
        @Body() dto: EditInvArticleDto
    ) {
        return this.invArticleService.editInvArticleByArticleCode(invArticleId, dto)
    }

    // @Delete(':articlecode')
    // deleteInvArticleByArticleCode(@Param('articlecode', ParseIntPipe) invArticleId: number) {
    //     return this.invArticleService.deleteInvArticleByArticleCode(invArticleId)
    // }
}
