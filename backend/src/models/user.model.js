const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name'],
      trim: true
    },
    role: {
      type: String,
      enum: ['admin'],
      lowercase: true,
      default: 'admin'
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
