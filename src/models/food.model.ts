import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    default: null,
  },
  foodDescription: {
    type: String,
    default: null,
  },
  foodStatus: {
    type: Number,
    default: 1,
  },
  foodGroupName: {
    type: String,
    required: true,
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
  groupIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'GroupOption',
      required: true,
    },
  ],
});

export const FoodModel = mongoose.model('Food', schema);
