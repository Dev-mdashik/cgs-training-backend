import UserModel from "../models/userModel.js"

export const getUser = async (req, res) => {
    try {
        const data = await UserModel.find({});
        res.status(200).json({success: true, msg: 'Users retrieved successfully', data});
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})
    }
}

export const createUser = async (req, res) => {
    try {
        const createdUser = await UserModel.create(req.body);
        res.status(201).json({success: true, msg: 'User created successfully', data: createdUser});
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body);

        if(!updatedUser){ res.status(404).json({success: false, msg: 'Id not found'}) }
        res.status(200).json({success: true, msg: 'User updated successfully', data: updatedUser});
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if(!deletedUser){ res.status(404).json({success: false, msg: 'Id not found'}) }
        res.status(200).json({success: true, msg: 'User deleted successfully', data: deletedUser});
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})
    }
}