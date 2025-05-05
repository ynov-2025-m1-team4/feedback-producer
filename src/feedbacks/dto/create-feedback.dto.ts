import { IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  channel: string;

  @IsString()
  text: string;
}
