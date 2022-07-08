import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model.js';
import { UserRepository } from './providers/user.repository.js';
import { FavouriteModule } from '../Favourite/favourite.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FavouriteModule,
  ],
  providers: [UserResolver, UserRepository],
})
export class UserModule {}
