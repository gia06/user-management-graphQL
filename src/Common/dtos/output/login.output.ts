import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class LoginOutput {
  @Field(() => String)
  @IsString()
  message: string;

  @Field()
  @IsString()
  token: string;
}
