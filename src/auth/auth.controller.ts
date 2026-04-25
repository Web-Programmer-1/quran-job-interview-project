import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-guard.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decoders/decoder.roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return result;
  }


  @Post('login')
  async login (@Body() loginDto:LoginDto) {

    const result = await this.authService.login(loginDto);
    // console.log('SECRET:', process.env.JWT_SECRET);
    return result;


  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER', 'ADMIN')
  async getProfile(@Request() req){

    const userId = req.user.sub;

   return  await this.authService.getMeProfile(userId);

    


  }




}