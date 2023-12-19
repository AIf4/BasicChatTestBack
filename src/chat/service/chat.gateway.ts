import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { CreateChatDto } from '../dto/chat.dto';
import { ChatService } from './chat.service';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('iniciando Socket');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Alguien se conecto al socket');
  }

  handleDisconnect(client: any) {
    console.log('Alguien se desconecto al socket');
  }

  @SubscribeMessage('event_message')
  async IncommingMessage(
    client: Socket,
    @MessageBody() payload: CreateChatDto,
  ) {
    const chatSave = await this.chatService.createChat(payload);
    const chat = await this.chatService.findChatById(chatSave.id);
    this.server.emit('new_message', chat);
  }
}
