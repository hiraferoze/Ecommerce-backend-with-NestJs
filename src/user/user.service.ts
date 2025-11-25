import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async createUser(registerUserDto: RegisterDto){

        try {
            return await this.userModel.create({
            fname:registerUserDto.fname,
            lname:registerUserDto.lname,
            email:registerUserDto.email,
            password:registerUserDto.password,
        })
    }catch(err){
        const DUPLICAT_KEY_CODE=11000
       if(err.code === DUPLICAT_KEY_CODE){
        throw new ConflictException("Email is already taken.")
       }
       throw err;
    }

        
    }
}
