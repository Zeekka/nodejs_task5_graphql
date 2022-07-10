import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../model/user.model.js';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto.js';
import { Injectable } from '@nestjs/common';
import {
  Favourite,
  FavouriteDocument,
} from '../../Favourite/model/favourite.model.js';
import { FavouriteDto } from '../../Favourite/dto/favourite.dto.js';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Favourite.name)
    private favouriteModel: Model<FavouriteDocument>,
  ) {}

  async register(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    const userFavourites = new FavouriteDto();
    userFavourites.userId = createdUser._id.toString();
    const createdFavourites = new this.favouriteModel(userFavourites);
    createdFavourites.save();
    return createdUser.save();
  }

  async user(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
