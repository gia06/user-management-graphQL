import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUsersArgs {
  @Field()
  @IsNotEmpty()
  token: string;
}
