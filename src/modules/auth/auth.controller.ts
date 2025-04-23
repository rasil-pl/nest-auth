import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response as ResponseType } from 'express';

import { CurrentUser } from '../../common/decorators';
import { AuthenticatedRequest, RequestCurrentUser } from '../../types';
import {
  CreateUserDto,
  CreateUserResponseDto,
  LoginUserResponseDto,
} from '../users/dtos';
import { LoginUserDto } from './dtos';
import { JwtRefreshAuthGuard } from './guards';
import { JwtAuthGuard } from './guards';
import { AuthService } from './providers';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: CreateUserResponseDto,
  })
  @ApiConflictResponse({
    description: 'Already exists',
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signupUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiOkResponse({
    description: 'User Logged in successfully',
    type: LoginUserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Response() res: ResponseType,
  ) {
    const { accessToken, user } = await this.authService.loginUser(
      loginUserDto,
      res,
    );
    return res.status(HttpStatus.OK).json({ accessToken, user });
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate refresh token for user' })
  @ApiOkResponse({ description: 'Refresh token generated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @Request() req: AuthenticatedRequest,
    @CurrentUser() currentUser: RequestCurrentUser,
    @Response() res: ResponseType,
  ) {
    const { accessToken } = await this.authService.refreshTokenForUser(
      req,
      currentUser,
      res,
    );
    return res.status(HttpStatus.OK).json({ accessToken });
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout' })
  @ApiNoContentResponse({ description: 'Logged out successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async logout(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Response() res: ResponseType,
  ) {
    await this.authService.logoutUser(currentUser, res);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
