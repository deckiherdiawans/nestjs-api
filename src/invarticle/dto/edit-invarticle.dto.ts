import { IsOptional, IsString } from "class-validator"

export class EditInvArticleDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    link?: string
}