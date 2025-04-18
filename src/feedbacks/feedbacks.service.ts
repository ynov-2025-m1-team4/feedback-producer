import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback.name)
    private feedbackModel: Model<FeedbackDocument>,
  ) {}

  create(dto: CreateFeedbackDto) {
    return this.feedbackModel.create(dto);
  }

  findAll() {
    return this.feedbackModel.find().exec();
  }

  findOne(id: string) {
    return this.feedbackModel.findById(id).exec();
  }

  update(id: string, dto: UpdateFeedbackDto) {
    return this.feedbackModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.feedbackModel.findByIdAndDelete(id).exec();
  }
}
