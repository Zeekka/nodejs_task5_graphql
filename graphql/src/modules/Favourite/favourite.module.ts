import { Module } from '@nestjs/common';
import { FavouriteResolver } from './favourite.resolver.js';

@Module({
  providers: [FavouriteResolver],
})
export class FavouriteModule {}
