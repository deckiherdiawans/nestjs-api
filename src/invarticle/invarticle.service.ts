import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvArticleDto } from './dto/create-invarticle.dto';
import { EditInvArticleDto } from './dto/edit-invarticle.dto';

@Injectable()
export class InvArticleService {
    constructor(private prisma: PrismaService) { }

    getInvArticle() {
        return { message: "You are getting all Inventory Articles." }
    }

    getInvArticleByArticleCode(invArticleId: number) {
        return { message: "You are getting an Inventory Article." }
    }

    createInvArticle(dto: CreateInvArticleDto) {
        return { message: "You are creating an Inventory Article." }
    }

    async editInvArticleByArticleCode(invArticleId: number, dto: EditInvArticleDto) {
        return { message: "You are editing an Inventory Article." }
    }

    // async deleteInvArticleByArticleCode(invArticleId: number) {
    //     const invarticle = await this.prisma.invarticle.findUnique({
    //         where: { invarticle: invArticleId }
    //     })

    //     await this.prisma.invarticle.delete({
    //         where: { invarticle: invArticleId }
    //     })
    // }
}
