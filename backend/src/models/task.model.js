const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Please add task name'],
      trim: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    isComplete: {
      type: Boolean,
      lowercase: true,
      default: false
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

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
