import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  groupOptionName: {
    type: String,
    required: true,
  },
  groupOptionStatus: {
    type: String,
    default: 1,
  },
  optionIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'OptionFood',
      required: true,
    },
  ],
});

export const GroupOptionModel = mongoose.model('GroupOption', schema);
