import 'dotenv/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ArtistModule } from './models/Artist/artist.module.js';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: './src/models/schema.gql',
            playground: process.env.APP_ENV === 'dev'
        } as ApolloDriverConfig),
        ArtistModule
    ]
})
export class AppModule {
}
