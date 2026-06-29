import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"],
            trim: true,
            maxlength: [30, "User name shouldn't be upto 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            maxlength: [50, "Email shouldn't be upto 50 characters"]
        },       
        role: {
            type: String,
            required: false,            
            enum: ['user', 'admin'],
            default: 'user'
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
            minlength: [8, "Password must be minimum 8 characters"]
        },
        confirmPassword: {
            type: String,
            required: [true, "Confirm password is required"],
            trim: true,
            minlength: [8, "Confirm password must be minimum 8 characters"]
        },
    }, {timestamps: true}
);

const UserModel = mongoose.model('User', userSchema);
export default UserModel;