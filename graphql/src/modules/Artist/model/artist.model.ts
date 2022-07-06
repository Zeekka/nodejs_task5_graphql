import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
@ObjectType()
export class Artist {
  @Field((type) => ID)
  id: string;

  @Prop()
  @Field({ nullable: true })
  firstName?: string;

  @Prop()
  @Field({ nullable: true })
  secondName?: string;

  @Prop()
  @Field({ nullable: true })
  middleName?: string;

  @Prop()
  @Field({ nullable: true })
  birthDate?: string;

  @Prop()
  @Field({ nullable: true })
  birthPlace?: string;

  @Prop()
  @Field({ nullable: true })
  country?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Band' }] })
  @Field((type) => [Band], { nullable: true })
  bands?: string[];

  @Prop([String])
  @Field((type) => [String], { nullable: true })
  instruments?: string[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
