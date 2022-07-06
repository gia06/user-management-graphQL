import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  firstname?: string;

  @Field()
  @IsString()
  lastname?: string;

  @Field()
  @IsString()
  nickname?: string;
}
