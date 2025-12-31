import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true,
        minLength: 3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:6 
    }
},{timestamps:true});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const hashedPassword = await bcrypt.hash(String(this.password), 10);
    this.password = hashedPassword;
});


const User = mongoose.model('User',userSchema);

export default User;