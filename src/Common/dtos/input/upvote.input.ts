import { InputType, Field } from "@nestjs/graphql"
import { IsString } from "class-validator"

@InputType()
export class VoteInput {
    @Field()
    @IsString()
    token: string

    @Field()
    @IsString()
    nickname: string
}