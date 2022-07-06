import { ObjectType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class DeleteOutput {
    @Field(() => String)
    @IsNotEmpty()
    message: string;
}