import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  firstname: string;

  @IsNotEmpty()
  @Field()
  lastname: string;

  @IsNotEmpty()
  @Field()
  nickname: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
