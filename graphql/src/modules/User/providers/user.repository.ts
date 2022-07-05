import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../model/user.model.js';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async user(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
