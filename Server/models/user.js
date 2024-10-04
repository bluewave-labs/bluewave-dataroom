const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicUrl: {
        type: String,
    },
    profileImage: {
        type: Buffer,
        contentType: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.pre('updateOne', async function (next) {
    const user = this.getUpdate();
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.updatedAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('users', UserSchema);