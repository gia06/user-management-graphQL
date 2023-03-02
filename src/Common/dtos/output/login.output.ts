import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class LoginOutput {
  @Field(() => String)
  @IsNotEmpty()
  message: string;

  @Field()
  @IsNotEmpty()
  token: string;
}
