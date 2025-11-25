import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,
        private readonly jwtService: JwtService){}
    async registerUser(registerUserDto :RegisterDto){
        // console.log('registerDto',registerUserDto)

        const saltRounds = 10;
        const hash=await bcrypt.hash(registerUserDto.password, saltRounds);

        const user= await  this.userService.createUser({
            ...registerUserDto,password:hash})

        const payload = { sub:user._id};;
        const token= await this.jwtService.signAsync(payload)
        console.log(token)
        return {access_token :token};
    }

    async login(email:string, password:string){
        const user=await this.userService.findByEmail(email)
        if(!user){
            throw new UnauthorizedException('Invalid Email or password');
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new UnauthorizedException('Invalid password!')

        }
        const payload={sub:user._id};
        const token = await this.jwtService.signAsync(payload);
        return {
      message: 'Login successful',
      access_token: token,
    };
    }
}
