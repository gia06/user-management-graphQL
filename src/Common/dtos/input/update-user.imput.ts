import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  firstname?: string;

  @Field()
  @IsString()
  lastname?: string;

  @Field()
  @IsString()
  nickname?: string;
}
