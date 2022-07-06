import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Band, BandDocument } from '../model/band.model.js';
import { Model } from 'mongoose';
import { BandDto } from '../dto/band.dto.js';

@Injectable()
export class BandRepository {
  constructor(@InjectModel(Band.name) private bandModel: Model<BandDocument>) {}

  async findOneById(id: string): Promise<Band> {
    return this.bandModel.findById(id);
  }

  async findAll(): Promise<Band[]> {
    return this.bandModel.find();
  }

  async createBand(bandDto: BandDto): Promise<Band> {
    const createdBand: BandDocument = new this.bandModel(bandDto);
    return createdBand.save();
  }

  async deleteBand(id: string): Promise<Band> {
    return this.bandModel.findByIdAndDelete(id).exec();
  }

  async updateBand(id: string, bandDto: BandDto): Promise<Band> {
    return this.bandModel.findByIdAndUpdate(id, bandDto).exec();
  }
}
