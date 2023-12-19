import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateChatDto {
  @IsString()
  readonly message: string;
  @IsNumber()
  readonly user_id: number;
}
export class UpdateChatDto extends PartialType(CreateChatDto) {}
