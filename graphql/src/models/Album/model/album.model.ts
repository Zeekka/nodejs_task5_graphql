import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';
import { Genre } from '../../Genre/model/genre.model.js';
import { Artist } from '../../Artist/model/artist.model.js';

@ObjectType()
export class Album {
    @Field(type => ID)
    id: string;

    @Field({nullable: true})
    name?: string;

    @Field(type => Int, {nullable: true})
    released?: number;

    @Field(type => [Artist], {nullable: true})
    artists?: string[];

    @Field(type => [Band], {nullable: true})
    bands?: string[];

    // @Field(type => [Track], {nullable: true})
    // tracks?: string[];

    @Field(type => [Genre], {nullable: true})
    genres?: string[];

    @Field({nullable: true})
    image?: string;
}
