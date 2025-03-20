import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { config } from 'src/config';
import { CreateUserDto } from 'src/modules/users/dtos';
import { UsersService } from 'src/modules/users/providers';
import { AuthenticatedRequest, RequestCurrentUser } from 'src/types';

import { LoginUserDto } from '../dtos';
import { JwtPayload } from '../types';
import { HashingService } from './hashing.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async signupUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );
    return await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async loginUser(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    const payload = {
      email: user.email,
      sub: user.uuid,
      role: user.role,
    } satisfies JwtPayload;
    return await this.issueTokensAndSetRefreshCookie(payload, res);
  }

  async refreshTokenForUser(
    req: AuthenticatedRequest,
    currentUser: RequestCurrentUser,
    res: Response,
  ) {
    const refreshTokenFromCookie = this.refreshTokenService.getCookie(req);
    await this.refreshTokenService.validate(
      refreshTokenFromCookie,
      currentUser.id,
    );
    const payload = {
      email: currentUser.email,
      sub: currentUser.id,
      role: currentUser.role,
    } satisfies JwtPayload;
    return await this.issueTokensAndSetRefreshCookie(payload, res);
  }

  async logoutUser(currentUser: RequestCurrentUser, res: Response) {
    this.refreshTokenService.expireCookie(res);
    await this.refreshTokenService.remove(currentUser.id);
  }

  private async issueTokensAndSetRefreshCookie(
    payload: JwtPayload,
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.generateTokens(payload);
    const userId = payload.sub;
    await this.refreshTokenService.saveRefreshToken(refreshToken, userId);
    this.refreshTokenService.setCookie(res, refreshToken);
    return { accessToken };
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const doesPasswordMatch = await this.hashingService.compare(
      password,
      user.password,
    );
    if (!doesPasswordMatch) {
      throw new BadRequestException("Email or password doesn't match");
    }
    return user;
  }

  private async generateTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.accessTokenExpiry,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.refreshTokenExpiry,
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
