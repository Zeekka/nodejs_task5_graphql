import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../model/artist.model.js';
import { Model } from 'mongoose';
import { ArtistDto } from '../dto/artist.dto.js';
import { Band, BandDocument } from '../../Band/model/band.model.js';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Band.name) private bandModel: Model<BandDocument>,
  ) {}

  public findOneById(id: string): Promise<Artist> {
    return this.artistModel.findById(id).exec();
  }

  public findAll(): Promise<Artist[]> {
    return this.artistModel.find().exec();
  }

  public createArtist(artistDto: ArtistDto): Promise<Artist> {
    const createdArtist = new this.artistModel(artistDto);
    return createdArtist.save();
  }

  public deleteArtist(id: string): Promise<Artist> {
    return this.artistModel.findByIdAndDelete(id).exec();
  }

  public updateArtist(id: string, artistDto: ArtistDto): Promise<Artist> {
    return this.artistModel.findByIdAndUpdate(id, artistDto).exec();
  }

  public bands(artist: ArtistDocument): Promise<Band[]> {
    const bandIds = artist.bands;
    return this.bandModel.find({ _id: { $in: bandIds } }).exec();
  }
}
