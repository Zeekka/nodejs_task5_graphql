import { Module } from '@nestjs/common';
import { BandResolver } from './band.resolver.js';

@Module({
    providers: [BandResolver]
})
export class BandModule {
}