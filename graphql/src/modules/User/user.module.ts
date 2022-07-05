import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model.js';
import { UserRepository } from './providers/user.repository.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserRepository],
})
export class UserModule {}
