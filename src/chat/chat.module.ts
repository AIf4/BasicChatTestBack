import { Module } from '@nestjs/common';
import { ChatController } from './controller/chat.controller';
import { ChatService } from './service/chat.service';
import { Chat } from './entity/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([
        Chat
    ])],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {};