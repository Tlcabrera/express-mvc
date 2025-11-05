import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    rol: String
});
export const userModel = mongoose.model('Users', userSchema);