import 'dotenv/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ArtistModule } from './modules/Artist/artist.module.js';
import { BandModule } from './modules/Band/band.module.js';
import { GenreModule } from './modules/Genre/genre.module.js';
import { AlbumModule } from './modules/Album/album.module.js';
import { TrackModule } from './modules/Track/track.module.js';
import { UserModule } from './modules/User/user.module.js';
import { FavouriteModule } from './modules/Favourite/favourite.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { PluginsModule } from './plugins/plugins.module.js';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/modules/schema.gql',
      playground: process.env.APP_ENV === 'dev',
    } as ApolloDriverConfig),
    ArtistModule,
    BandModule,
    GenreModule,
    AlbumModule,
    TrackModule,
    UserModule,
    FavouriteModule,
    PluginsModule,
  ],
})
export class AppModule {}
