import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    fname: string;

    @IsNotEmpty()
    lname :string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;

}