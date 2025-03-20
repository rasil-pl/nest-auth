import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshTokenDto } from '../dtos';
import { RefreshToken } from '../entities';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async upsert(refreshTokenDto: RefreshTokenDto) {
    const { userId, token, expiresAt } = refreshTokenDto;
    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { token, expiresAt, updatedAt: Date.now() },
      { upsert: true },
    );
  }

  async findOne(filter: Partial<RefreshToken>) {
    return await this.refreshTokenModel.findOne(filter).exec();
  }

  async delete(userId: string) {
    await this.refreshTokenModel.deleteOne({ userId }).exec();
  }
}
