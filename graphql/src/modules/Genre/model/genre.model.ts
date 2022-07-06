import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema()
@ObjectType()
export class Genre {
  @Field((type) => ID)
  id: string;

  @Prop()
  @Field({ nullable: true })
  name?: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop()
  @Field({ nullable: true })
  country?: string;

  @Prop()
  @Field((type) => Int, { nullable: true })
  year?: number;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
