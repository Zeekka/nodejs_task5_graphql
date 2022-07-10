import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';
import { Genre } from '../../Genre/model/genre.model.js';
import { Album } from '../../Album/model/album.model.js';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
@ObjectType()
export class Track {
  @Field((type) => ID)
  id: string;

  @Prop()
  @Field({ nullable: true })
  title?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Album' }] })
  @Field((type) => [Album], { nullable: true })
  albums?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Band' }] })
  @Field((type) => [Band], { nullable: true })
  bands?: string[];

  @Prop()
  @Field((type) => Int, { nullable: true })
  duration?: number;

  @Prop()
  @Field((type) => Int, { nullable: true })
  released?: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Genre' }] })
  @Field((type) => [Genre], { nullable: true })
  genres?: string[];
}

export const TracksSchema = SchemaFactory.createForClass(Track);
