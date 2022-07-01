import { Field, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"

@ObjectType()
export class LoginInterface {
    @Field(() => String)
    @IsString()
    message: string

    @Field()
    @IsString()
    token: string
}