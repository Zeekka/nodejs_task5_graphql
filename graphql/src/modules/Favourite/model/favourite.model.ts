import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';
import { Genre } from '../../Genre/model/genre.model.js';
import { Artist } from '../../Artist/model/artist.model.js';
import { Track } from '../../Track/model/track.model.js';
import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../User/model/user.model.js';

export type FavouriteDocument = Favourite & Document;

@Schema()
@ObjectType()
export class Favourite {
  @Field((type) => ID)
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field((type) => User)
  userId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Band' }] })
  @Field((type) => [Band], { nullable: true })
  bands?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Genre' }] })
  @Field((type) => [Genre], { nullable: true })
  genres?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Artist' }] })
  @Field((type) => [Artist], { nullable: true })
  artists?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, name: 'Track' }] })
  @Field((type) => [Track], { nullable: true })
  tracks?: string[];
}

export const favouriteSchema = SchemaFactory.createForClass(Favourite);
