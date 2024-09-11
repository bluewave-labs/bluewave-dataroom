const mongoose = require('mongoose');
const UserModel = require('../../models/user');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database');
        throw error;
    }
};

const checkAdminUser = async (req, res) => {
    try {
        const adminUser = await UserModel.findOne({ role: 'admin' });
        if (!adminUser) {
            // return res.status(404).json({ message: 'Admin user not found' });
            return false;
        }
        // return res.status(200).json(adminUser);
        return true;
    } catch (error) {
        console.error('Failed to check for admin user');
        // return res.status(500).json({ message: 'Failed to check for admin user' });
        throw error;
    }
}

module.exports = { 
    connect,
    checkAdminUser 
};