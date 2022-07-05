import { ObjectType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
export class DeleteOutput {
    @Field(() => String)
    @IsString()
    message: string;
}