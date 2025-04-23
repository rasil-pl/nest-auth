import { Module } from '@nestjs/common';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { CloudinaryProvider, CloudinaryService } from './providers';

@Module({
  providers: [FilesService, CloudinaryProvider, CloudinaryService],
  controllers: [FilesController],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class FilesModule {}
