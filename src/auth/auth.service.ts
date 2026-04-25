import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService:JwtService,
  ) {}

  async register(registerDto: RegisterDto ) {

    const { userName, email, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where:{email}
    });

    if(existingUser){
      throw new BadRequestException("Email already exists");
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data:{
        userName: userName,
        email: email,
        password: hashedPassword
      },
      select:{
        id: true,
        userName: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

  return {
    message: "User registered successfully",
    user
  }


  }

  async login (loginDto:LoginDto) {

    const {email, password} = loginDto;

    const user = await this.prisma.user.findUnique({
      where:{email}
    });

    if(!user){
      throw new BadRequestException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){

      throw new UnauthorizedException("Wrong password");
    }

    const payload = {
  sub: user.id,
  email: user.email,
  role: user.role,
};

const accessToken = this.jwtService.sign(payload, {
  secret: process.env.JWT_SECRET,
  expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
});

    return {
      message :"User Login SuccessFully",
      accessToken,
      user:{
        id:user.id,
        userName:user.userName,
        email:user.email,
        role:user.role
      }
    }

}



async getMeProfile(userId:string){

const user = await this.prisma.user.findUnique({
  where:{
    id:userId
  },
  select:{
    id:true,
    userName:true,
    email:true,
    role:true,
    createdAt:true,
    updatedAt:true
  }
});

  if(!user){
    throw new NotFoundException("Not Found User")
  }

  return {
    message :"Profile Retrive SuccessFully",
    user
  }

}














}