import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';
import { Genre } from '../../Genre/model/genre.model.js';
import { Album } from '../../Album/model/album.model.js';

@ObjectType()
export class Track {
    @Field(type => ID)
    id: string;

    @Field({nullable: true})
    title?: string;

    @Field(type => [Album], {nullable: true})
    albums?: string[];

    @Field(type => [Band], {nullable: true})
    bands?: string[];

    @Field(type => Int, {nullable: true})
    duration?: number;

    @Field(type => Int, {nullable: true})
    released?: number;

    @Field(type => [Genre],{nullable: true})
    genres?: string[];
}
