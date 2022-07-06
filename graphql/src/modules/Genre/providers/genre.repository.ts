import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from '../model/genre.model.js';
import { Model } from 'mongoose';
import { GenreDto } from '../dto/genre.dto.js';

@Injectable()
export class GenreRepository {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  public findOneById(id: string): Promise<Genre> {
    return this.genreModel.findById(id).exec();
  }

  public findAll(): Promise<Genre[]> {
    return this.genreModel.find().exec();
  }

  public createGenre(genreDto: GenreDto): Promise<Genre> {
    const createGenre = new this.genreModel(genreDto);
    return createGenre.save();
  }

  public deleteGenre(id: string): Promise<Genre> {
    return this.genreModel.findByIdAndDelete(id).exec();
  }

  public updateGenre(id: string, genreDto: GenreDto): Promise<Genre> {
    return this.genreModel.findByIdAndUpdate(id, genreDto).exec();
  }
}
