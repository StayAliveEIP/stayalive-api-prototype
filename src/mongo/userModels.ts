// create a new user model and export it for mongoose
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    pwdHash: String
});

const UserModels = mongoose.model('User', UserSchema);

export default UserModels;
