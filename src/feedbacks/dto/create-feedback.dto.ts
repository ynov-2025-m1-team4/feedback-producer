import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'web',
    description:
      'The channel where the feedback was submitted (e.g., web, mobile, etc.)',
  })
  @IsString()
  channel: string;

  @ApiProperty({
    example: 'Great service!',
    description: 'The feedback text provided by the user.',
  })
  @IsString()
  text: string;
}

export class FeedbackResponseDto {
  @ApiProperty({ example: '2025-06-19T12:00:00.000Z' })
  date: string;

  @ApiProperty({ example: 'web' })
  channel: string;

  @ApiProperty({ example: 'Great service!' })
  text: string;
}
