import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

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
}
