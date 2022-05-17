import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  optionName: {
    type: String,
    required: true,
  },
  optionStatus: {
    type: String,
    default: null,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    default: null,
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    default: null,
  },
});

export const OptionFoodModel = mongoose.model('OptionFood', schema);
