import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Artist } from '../../Artist/model/artist.model.js';
import { Genre } from '../../Genre/model/genre.model.js';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BandDocument = Band & Document;

@Schema()
@ObjectType()
export class Band {
  @Field((type) => ID)
  id: string;

  @Prop()
  @Field({ nullable: true })
  name?: string;

  @Prop()
  @Field({ nullable: true })
  origin?: string;

  @Prop()
  @Field((type) => [Artist], { nullable: true })
  members?: string[];

  @Prop()
  @Field({ nullable: true })
  website?: string;

  @Field((type) => [Genre], { nullable: true })
  genres?: string[];
}

export const BandSchema = SchemaFactory.createForClass(Band);
