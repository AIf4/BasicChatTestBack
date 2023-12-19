import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { CreateChatDto, UpdateChatDto } from '../dto/chat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiBearerAuth()
@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  createChat(@Body() payload: CreateChatDto) {
    return this.chatService.createChat(payload);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllChats() {
    return this.chatService.findAllChat();
  }

  @Get(':id')
  getChatById(@Param('id') id: number) {
    return this.chatService.findChatById(id);
  }

  @Patch(':id')
  updateChatById(@Param('id') id: number, @Body() payload: UpdateChatDto) {
    return this.chatService.updateChatById(id, payload);
  }

  @Delete(':id')
  removeChat(@Param('id') id: number) {
    return this.chatService.deleteChat(id);
  }
}
