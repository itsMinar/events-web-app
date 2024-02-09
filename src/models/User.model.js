import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// create User model
const User = models.User || model('User', userSchema);

export default User;
