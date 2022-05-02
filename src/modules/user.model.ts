import mongoose, {Schema} from "mongoose";

const UserSchema: Schema = new Schema({
    user_name:String,
    email:String,
    password:String
})
export const User = mongoose.model('user',UserSchema)