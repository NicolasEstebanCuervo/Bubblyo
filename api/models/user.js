import {Schema,model} from "mongoose";

const UserSchema = new Schema({
    username: {type:String, require:true, min:4, unique:true},
    password: {type:String, require:true},
})

const UserModel = model("User",UserSchema);

export default UserModel