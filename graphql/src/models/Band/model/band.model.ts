import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Artist } from '../../Artist/model/artist.model.js';

@ObjectType()
export class Band {
    @Field(type => ID)
    id: string;

    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    origin?: string;

    @Field(type => [Artist], {nullable: true})
    members?: string[];

    @Field({nullable: true})
    website?: string;

    // @Field({ nullable: true })
    // genres?: Genre[];
}