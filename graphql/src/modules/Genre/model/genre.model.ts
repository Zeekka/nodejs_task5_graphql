import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { type } from 'os';

@ObjectType()
export class Genre {
    @Field(type => ID)
    id: string;

    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    description?: string;

    @Field({nullable: true})
    country?: string;

    @Field(type => Int, {nullable: true})
    year?: number;
}
