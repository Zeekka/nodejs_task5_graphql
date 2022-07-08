import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';
import { Genre } from '../../Genre/model/genre.model.js';
import { Artist } from '../../Artist/model/artist.model.js';
import { Track } from '../../Track/model/track.model.js';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
@ObjectType()
export class Album {
  @Field((type) => ID)
  id: string;

  @Prop()
  @Field({ nullable: true })
  name?: string;

  @Prop()
  @Field((type) => Int, { nullable: true })
  released?: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Artist' }] })
  @Field((type) => [Artist], { nullable: true })
  artists?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Band' }] })
  @Field((type) => [Band], { nullable: true })
  bands?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Track' }] })
  @Field((type) => [Track], { nullable: true })
  tracks?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Genre' }] })
  @Field((type) => [Genre], { nullable: true })
  genres?: string[];

  @Prop()
  @Field({ nullable: true })
  image?: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
