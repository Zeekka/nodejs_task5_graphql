import { Field, ID, ObjectType } from '@nestjs/graphql';

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

    // @Field({ nullable: true })
    // bands?: [string];

    @Field(type => [String], {nullable: true})
    instruments?: string[];
}