import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { typeOrnAsyncConfig } from './config/typeorm.config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ChatModule,
    TypeOrmModule.forRootAsync(typeOrnAsyncConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
