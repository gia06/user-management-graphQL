import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type UserDocument = User & Document;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field()
  @Prop({ required: true })
  nickname: string;

  @Field(() => String)
  @Prop({ default: 'user' })
  role: string;

  @Field()
  @Prop({ required: true })
  firstname: string;

  @Field()
  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, minlength: 5 })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  deleted_at: string;

  @Field()
  @Prop({ default: 0 })
  votes: number;

  @Prop({ default: [] })
  upvotedBy: string[];

  @Prop({ default: [] })
  downvotedBy: string[];

  @Prop()
  created_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
