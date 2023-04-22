import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { CreateChatDto, UpdateChatDto } from '../dto/chat.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService){}

    @Post()
    createChat(@Body() payload: CreateChatDto){
        return this.chatService.createChat(payload);
    }

    @Get()
    getAllChats(){
        return this.chatService.findAllChats();
    }

    @Get(':id')
    getChatById(@Param('id') id:number){
        return this.chatService.findChatById(id);
    }

    @Patch(':id')
    updateChatById(@Param('id') id:number, @Body() payload: UpdateChatDto){
        return this.chatService.updateChatById(id, payload);
    }

    @Delete(':id')
    removeChat(@Param('id') id:number ){
        return this.chatService.deleteChat(id);
    }
}