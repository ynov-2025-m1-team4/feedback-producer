import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop({ default: Date.now })
  date: Date;

  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  text: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
