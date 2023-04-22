import { Controller, Get, Param, Post, Patch, Body, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from 'src/guard/auth.guard';


@ApiBasicAuth()
@ApiTags("User")
@Controller('user')
export class UserController {
       
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}


    @Post()
    createUser(@Body() payload: CreateUserDto){
        return this.userService.createUser(payload);
    }

    @Post('login')
    login(@Body() payload: LoginUserDto){
        return this.authService.login(payload);
    }

    @UseGuards(AuthGuard)
    @Get()
    getAllUsers(){
        return this.userService.findAllUser();
    }

    @Get(':id')
    getUserById(@Param('id') id:number){
        return this.userService.findUserById(id);
    }

    @Patch(':id')
    updateUserById(@Param('id') id:number, @Body() payload: UpdateUserDto){
        return this.userService.updateUserById(id, payload);
    }

    @Delete(':id')
    removeUser(@Param('id') id:number ){
        return this.userService.deleteUser(id);
    }
}