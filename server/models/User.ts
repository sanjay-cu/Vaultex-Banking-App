import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  accountNumber: string;
  dob?: string;
  gender?: string;
  phone?: string;
  nationalId?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  accountType?: string;
  initialDeposit?: number;
  currency?: string;
  pin?: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountNumber: { type: String, required: true },
  dob: { type: String },
  gender: { type: String },
  phone: { type: String },
  nationalId: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  accountType: { type: String },
  initialDeposit: { type: Number },
  currency: { type: String },
  pin: { type: String },
  securityQuestion: { type: String },
  securityAnswer: { type: String },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
