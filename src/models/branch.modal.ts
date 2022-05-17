import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  BranchName: {
    type: String,
    required: true,
    trim: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

export const BranchModel = mongoose.model('Branch', schema);
