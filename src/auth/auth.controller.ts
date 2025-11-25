import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginUser } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Get()
    getAll(){
        return 'Hello World!';
    }

    @Post('register')
    async register(@Body() registerUserDto :RegisterDto ){

        return await this.authService.registerUser(registerUserDto)
    }
    @Post('login')
    async login(@Body() loginDto: LoginUser) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
