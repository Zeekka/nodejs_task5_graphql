import { Module } from '@nestjs/common';
import { LoggedInPlugin } from './LoggedIn/loggedIn.plugin.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [LoggedInPlugin],
})
export class PluginsModule {}
