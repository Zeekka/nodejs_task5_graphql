import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './model/user.model.js';
import { UserDto } from './dto/user.dto.js';
import { UserRepository } from './providers/user.repository.js';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userRepository: UserRepository) {}

  @Query((returns) => User)
  async user(@Args('id') id: string) {
    return this.userRepository.user(id);
  }

  @ResolveField('id', () => String)
  async id(@Parent() user: Document) {
    return user._id.toString();
  }

  @Mutation((returns) => User)
  async register(
    @Args({ name: 'firstName', type: () => String, nullable: true })
    firstName: string,
    @Args({ name: 'secondName', type: () => String, nullable: true })
    secondName: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Args({ name: 'email', type: () => String }) email: string,
  ) {
    const userDto = new UserDto();
    userDto.firstName = firstName;
    userDto.secondName = secondName;
    userDto.email = email;
    userDto.password = await bcrypt.hash(password, 10);
    return this.userRepository.register(userDto);
  }
}
