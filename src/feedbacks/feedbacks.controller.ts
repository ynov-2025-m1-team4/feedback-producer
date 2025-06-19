import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import {
  CreateFeedbackDto,
  FeedbackResponseDto,
} from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbackService: FeedbacksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiQuery({
    name: 'from',
    required: false,
    description: 'Start date (ISO string) to filter feedbacks',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of feedbacks returned',
    type: Number,
  })
  @ApiOkResponse({
    description: 'List of feedbacks',
    type: [FeedbackResponseDto],
  })
  async findAll(
    @Query('from') since?: string,
    @Query('limit') limit?: number,
  ): Promise<FeedbackResponseDto[]> {
    const from = since ? new Date(since) : new Date('2000-01-01T00:00:00Z');
    const feedbacks = await this.feedbackService.findAll(from, limit);
    return feedbacks.map((fb) => ({
      date: fb.date instanceof Date ? fb.date.toISOString() : String(fb.date),
      channel: fb.channel,
      text: fb.text,
    }));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new feedback' })
  @ApiBody({
    type: CreateFeedbackDto,
  })
  @ApiCreatedResponse({
    description: 'Feedback created',
    type: FeedbackResponseDto,
  })
  async create(@Body() dto: CreateFeedbackDto): Promise<FeedbackResponseDto> {
    const fb = await this.feedbackService.create(dto);
    return {
      date: fb.date instanceof Date ? fb.date.toISOString() : String(fb.date),
      channel: fb.channel,
      text: fb.text,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a feedback by ID' })
  @ApiParam({ name: 'id', description: 'Feedback ID' })
  @ApiOkResponse({ description: 'Feedback found', type: FeedbackResponseDto })
  async findOne(@Param('id') id: string): Promise<FeedbackResponseDto> {
    const fb = await this.feedbackService.findOne(id);
    if (!fb) throw new Error('Feedback not found');
    return {
      date: fb.date instanceof Date ? fb.date.toISOString() : String(fb.date),
      channel: fb.channel,
      text: fb.text,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a feedback by ID' })
  @ApiParam({ name: 'id', description: 'Feedback ID' })
  @ApiBody({
    type: UpdateFeedbackDto,
  })
  @ApiOkResponse({ description: 'Feedback updated', type: FeedbackResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    const fb = await this.feedbackService.update(id, dto);
    if (!fb) throw new Error('Feedback not found');
    return {
      date: fb.date instanceof Date ? fb.date.toISOString() : String(fb.date),
      channel: fb.channel,
      text: fb.text,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feedback by ID' })
  @ApiParam({ name: 'id', description: 'Feedback ID' })
  @ApiOkResponse({
    description: 'Feedback deleted',
    schema: { example: { message: 'Feedback deleted successfully.' } },
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const fb = await this.feedbackService.remove(id);
    if (!fb) throw new Error('Feedback not found');
    return { message: 'Feedback deleted successfully.' };
  }
}
