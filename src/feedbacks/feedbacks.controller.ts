import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
<<<<<<< HEAD
  Query,
=======
>>>>>>> 302dbb7 (feat: simple feedback crud implement)
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbackService: FeedbacksService) {}

<<<<<<< HEAD
  @Get()
  findAll(@Query('from') since?: string, @Query('limit') limit?: number) {
    const from = since ? new Date(since) : new Date('2000-01-01T00:00:00Z');

    return this.feedbackService.findAll(from, limit);
  }

=======
>>>>>>> 302dbb7 (feat: simple feedback crud implement)
  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

<<<<<<< HEAD
=======
  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

>>>>>>> 302dbb7 (feat: simple feedback crud implement)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.feedbackService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
