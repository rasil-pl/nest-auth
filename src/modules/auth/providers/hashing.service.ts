import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private saltOrRounds = 10;

  constructor(private readonly loggerService: Logger) {}

  public async hash(password: string) {
    try {
      return await bcrypt.hash(password, this.saltOrRounds);
    } catch (error) {
      this.loggerService.error('Failed to hash: ', error);
      throw new InternalServerErrorException();
    }
  }

  public async compare(data: string | Buffer, encrypted: string) {
    try {
      return await bcrypt.compare(data, encrypted);
    } catch (e) {
      this.loggerService.error('Failed to compare: ', e);
      throw new InternalServerErrorException();
    }
  }
}
