import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        // TODO: 
        // console.log(users);
        
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
}   

export const updateMe = async (req, res, next) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ success: false, message: 'Invalid updates!' });
        }

        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// not using this controller as it is sub-optimal, rather using the getMe controller for /me route
export const getUserById = async (req, res, next) => {
    try {
        if(req.user._id.toString() !== req.params.id){
            return res
            .status(403)
            .json({success: false, message: 'Forbidden, you can only access your own user data'});
        }
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
}