import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';
import { Genre } from '../../Genre/model/genre.model.js';
import { Artist } from '../../Artist/model/artist.model.js';
import { Track } from '../../Track/model/track.model.js';

@ObjectType()
export class Favourite {
    @Field(type => ID)
    id: string;

    @Field(type => ID)
    userId: string;

    @Field(type => [Band], {nullable: true})
    bands?: string[];

    @Field(type => [Genre], {nullable: true})
    genres?: string[];

    @Field(type => [Artist], {nullable: true})
    artists?: string[];

    @Field(type => [Track], {nullable: true})
    tracks?: string[];
}
