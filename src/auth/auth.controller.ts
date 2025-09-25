import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthService, RefreshRequest } from './interface/auth.interface';
import { SignUpUserDto } from './dto/signup-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign Up user to microservice' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  signUp(@Body() body: SignUpUserDto) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign In user to microservice' })
  @ApiResponse({ status: 201, description: 'User sign in successfully' })
  async signIn(
    @Body() body: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await firstValueFrom(this.authService.signIn(body));
    console.log(result);

    res.cookie('refresh_token_auto_call', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    return { access_token: result.accessToken, message: result.message };
  }

  @Post('signout')
  @ApiOperation({ summary: 'Sign out user to microservice' })
  @ApiResponse({ status: 201, description: 'User sign out successfully' })
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken: string = req.cookies['refresh_token_auto_call'];

    if (!refreshToken) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const result = await firstValueFrom(
      this.authService.signOut({ refreshToken }),
    );

    res.clearCookie('refresh_token_auto_call', {
      httpOnly: true,
    });

    return { message: result.message };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token user to microservice' })
  @ApiResponse({ status: 201, description: 'User refresh token successfully' })
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const refreshToken = req.cookies['refresh_token_auto_call'];
    if (!refreshToken) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const result = await firstValueFrom(
      this.authService.refreshToken({ refreshToken }),
    );

    res.cookie('refresh_token_auto_call', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    return { access_token: result.accessToken };
  }
}
