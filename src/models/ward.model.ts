import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  WardName: {
    type: String,
    required: true,
    trim: true,
  },
  districtID: {
    type: Schema.Types.ObjectId,
    ref: 'District',
    required: true,
  },
});

export const WardModel = mongoose.model('Ward', schema);
