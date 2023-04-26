import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entity/chat.entity';
import { CreateChatDto, UpdateChatDto } from '../dto/chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepo: Repository<Chat>
    ) {}
    
    createChat(body: CreateChatDto){
        const chat = this.chatRepo.create(body);
        return this.chatRepo.save(chat);
    }

    findAllChats(){
        return this.chatRepo.find({
            relations: {
                user: true
            }
        });
    }

    async findChatById(id: number){
        const chat = await this.chatRepo.findOne({
            where:{ id },
            relations: {
                user: true
            }
        });
        if(!chat) throw new NotFoundException(`Chat no encontrado.`);
        return chat;
    }

    async updateChatById(id: number, body: UpdateChatDto){
        const chat = await this.chatRepo.findOneBy({ id });
        if(!chat) throw new NotFoundException(`chat no encontrado.`);
        const updateChat = this.chatRepo.merge( chat, body );
        return this.chatRepo.save(updateChat);
    }

    async deleteChat(id: number){
        const chat = await this.chatRepo.delete({ id });
        if (!chat.affected) throw new NotFoundException(`Chat no encontrado.`);
        return chat;
    }
}