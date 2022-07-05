import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
