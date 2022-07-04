import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Band } from '../../Band/model/band.model.js';

@ObjectType()
export class Artist {
    @Field(type => ID)
    id: string;

    @Field({nullable: true})
    firstName?: string;

    @Field({nullable: true})
    secondName?: string;

    @Field({nullable: true})
    middleName?: string;

    @Field({nullable: true})
    birthDate?: string;

    @Field({nullable: true})
    country?: string;

    @Field(type => [Band], { nullable: true })
    bands?: string[];

    @Field(type => [String], {nullable: true})
    instruments?: string[];
}