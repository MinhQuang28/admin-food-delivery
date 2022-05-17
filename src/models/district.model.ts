import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  districtName: {
    type: String,
    required: true,
    trim: true,
  },
  provinceId: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  },
});

export const DistrictModel = mongoose.model('District', schema);
