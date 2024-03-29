import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  nickname: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
