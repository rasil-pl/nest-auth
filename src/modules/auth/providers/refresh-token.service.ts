import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenKeys } from 'src/constants';
import { AuthenticatedRequest } from 'src/types';

import { RefreshTokenDto } from '../dtos';
import { RefreshToken } from '../entities';
import { DecodedJwtPayload } from '../types';
import { HashingService } from './hashing.service';
import { RefreshTokenRepository } from './refresh-token.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async create(refreshTokenDto: RefreshTokenDto) {
    await this.refreshTokenRepository.upsert(refreshTokenDto);
  }

  private async findByUserId(userId: string): Promise<RefreshToken | null> {
    return await this.refreshTokenRepository.findOne({ userId });
  }

  setCookie(res: Response, refreshToken: string) {
    res.cookie(TokenKeys.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      sameSite: 'none',
    });
  }

  getCookie(req: AuthenticatedRequest) {
    const refreshToken = req.cookies[TokenKeys.REFRESH_TOKEN] as string | null;
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return refreshToken;
  }

  expireCookie(res: Response) {
    res.cookie(TokenKeys.REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      sameSite: 'none',
      expires: new Date(0),
    });
  }

  async remove(userId: string) {
    await this.refreshTokenRepository.delete(userId);
  }

  async validate(refreshToken: string, userId: string) {
    const refreshTokenDoc = await this.findByUserId(userId);
    if (!refreshTokenDoc) {
      throw new NotFoundException();
    }
    const refreshTokenMatch = await this.hashingService.compare(
      refreshToken,
      refreshTokenDoc.token,
    );
    if (!refreshTokenMatch) {
      throw new UnauthorizedException();
    }
    return refreshTokenDoc;
  }

  async saveRefreshToken(refreshToken: string, userId: string) {
    const decodedJwtPayload =
      this.jwtService.decode<DecodedJwtPayload>(refreshToken);
    const expiresAt = new Date(decodedJwtPayload.exp * 1000);
    const hashedRefreshToken = await this.hashingService.hash(refreshToken);
    await this.create({
      token: hashedRefreshToken,
      expiresAt,
      userId,
    });
  }
}
