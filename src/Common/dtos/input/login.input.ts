import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  nickname: string;

  @Field()
  @IsString()
  password: string;
}
