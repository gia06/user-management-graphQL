import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class DeleteInput {
    @Field()
    @IsNotEmpty()
    token: string;

    @Field()
    @IsNotEmpty()
    nickname: string;
}