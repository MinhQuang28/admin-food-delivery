import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  provinceId: {
    type: Number,
    default: null,
  },
  districtId: {
    type: Number,
    default: null,
  },
  wardId: {
    type: Number,
    default: null,
  },
});

export const CompanyModel = mongoose.model('Company', schema);
