import { PartialType } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    readonly username: string;
    @IsString()
    readonly password: string;
    @IsBoolean()
    readonly type_user: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
    @IsString()
    readonly username: string;
    @IsString()
    readonly password: string;
}