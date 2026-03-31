const User = require("../models/User");

const createUser = (req, res, next) => {
    User.create(req.body)
    res.json({
        message: "data saved sucessfully",
        data: req.body
    })
}

const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const userView = await User.findOne({
            where: {
                id: userId
            }
        });
        if (!userView) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "succesfully see and view",
            data: userView
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "user data not found"
        })
    }
}

const getUserAll = async (req, res, next) => {
    try {
        const userList = await User.findAll(
            {
                where: {
                    role: "client"
                }
            }
        );
        return res.status(200).json({
            message: "Successfully got data",
            data: userList
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to load data",
            error: err.message
        });
    }
}

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        await User.destroy({ where: { id: userId } });
        const userList = await User.findAll();
        return res.status(200).json({
            message: "delete data succesfully",
            data: userList
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to delete data",
            error: err.message
        });
    }
}

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId, req.body, 'fafjslkjfs')
    {/* 
    try {
        await User.update({
            where: {
                id: userId
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to load data",
            error: err.message
        });
    }
    */}
}

module.exports = { createUser, getUserById, getUserAll, deleteUser, updateUser };

