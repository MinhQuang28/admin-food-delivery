import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  provinceName: {
    type: String,
    required: true,
    trim: true,
  },
});

export const ProvinceModel = mongoose.model('Province', schema);
