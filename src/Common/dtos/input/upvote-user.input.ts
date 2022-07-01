import {Field, InputType} from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType() 
export class UpvoteUserInput {
    @Field()
    @IsString()
    upvoteNickname: string

    // @Field()
    // @IsString()
    // myNickname: strin
}