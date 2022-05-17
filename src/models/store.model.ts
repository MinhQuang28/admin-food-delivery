import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  storeName: {
    type: String,
    required: true,
    trim: true,
  },
  storeImage: {
    type: String,
    default: null,
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
  storeStatus: {
    type: Number,
    default: 1,
  },
  storeAddress: {
    type: String,
    required: true,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

export const StoreModel = mongoose.model('Store', schema);
