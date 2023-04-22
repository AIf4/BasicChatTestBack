import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}
    
    async createUser(body: CreateUserDto){
        const user = this.userRepo.create(body);
        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
        return this.userRepo.save(user);
    }


    findAllUser(){
        return this.userRepo.find();
    }

    async findUserByUsername(username: string){
        const user = await this.userRepo.findOne({ where: { username }});
        if(!user) throw new NotFoundException(`Usuario no encontrado.`);
        return user;
    }

    async findUserById(id: number){
        const user = await this.userRepo.findOneBy({ id });
        if(!user) throw new NotFoundException(`Usuario no encontrado.`);
        return user;
    }

    async updateUserById(id: number, body: UpdateUserDto){
        const user = await this.userRepo.findOneBy({ id });
        if(!user) throw new NotFoundException(`Usuario no encontrado.`);
        const updateUser = this.userRepo.merge( user, body );
        return this.userRepo.save(updateUser);
    }

    async deleteUser(id: number){
        const user = await this.userRepo.delete({ id });
        if (!user.affected) throw new NotFoundException(`Usuario no encontrado.`);
        return user;
    }
}