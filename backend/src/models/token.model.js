const mongoose = require('mongoose');
const config = require('../config/config.js');

const TokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: [config.ACCESS_TOKEN, config.REFRESH_TOKEN],
      required: true
    },
    expires: {
      type: Date,
      required: true
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

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
