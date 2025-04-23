import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { FilesService } from './files.service';

@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Generate Upload URL' })
  @Post('generate-upload-url')
  generateUploadUrl() {
    return this.filesService.generateUploadUrl();
  }
}
