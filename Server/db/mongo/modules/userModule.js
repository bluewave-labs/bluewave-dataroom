const UserModel = require('../../../models/user');
const { errorMessages } = require('../../../utils/messages');

const DUPLICATE_ERROR_CODE = 11000; // MongoDB duplicate error code

/**
 * Inserts a new user into the database.
 * @async
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
 * @returns {Promise<UserModel>} The user object.
 * @throws {Error} Thrown if an error occurs.
 */
const insertUser = async (req, res) => {
    try {
        const user = {...req.body };

         // TODO: save user image
         /**
          * if(req.file) {
          *  user.profileImage = {
          *     data: req.file.buffer,
          *     contentType: req.file.mimetype,
          * };
          * 
          * const avatar = await GenerateAvatarImage(req.file);
          * user.profileImage = avatar;
          * }
          */

        const newUser = new UserModel(user);
        await newUser.save();
        return await UserModel.findOne({_id: newUser._id})
            .select('-password');
            //.select('-password -profileImage');
    } catch (error) {
        if (error.code === DUPLICATE_ERROR_CODE) {
            throw new Error(errorMessages.DB_USER_EXISTS);
        }
        throw error;
    }
};

/**
 * Retrieves a user by email.
 * @async
 * @param {string} email - The email address of the user.
 * @returns {Promise<UserModel>} The user object.
 * @throws {Error} Thrown if an error occurs.
 */
const getUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error(errorMessages.DB_USER_NOT_FOUND);
        }
        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a user by ID.
 * @async
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<UserModel>} The user object.
 * @throws {Error} Thrown if an error occurs.
 */
const deleteUserById = async (userId) => {
    try {
        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
            throw new Error(errorMessages.DB_USER_NOT_FOUND);
        }
        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieve all users.
 * @async
 * @returns {Promise<UserModel[]>} An array of user objects.
 */
const getAllUsers = async () => {
    try {
        return await UserModel.find()
            .select('-password');
            //.select('-password -profileImage');
    } catch (error) {
        throw error;
    }
};

/**
 * Signs out a user.
 * @async
 * @param {string} userId - The ID of the user to signout.
 * @returns {boolean} True if the user was signed out successfully
 * @throws {Error} Thrown if an error occurs.
 */
const signOutUser = async (userId) => {
    try {
        const user = await UserModel.updateOne({ _id: userId }, { $unset: {authToken: null} });
        if (!user) {
            throw new Error(errorMessages.DB_USER_NOT_FOUND);
        }
        return true;
    }
    catch (error) {
        throw error;
    }
};

module.exports = {
    insertUser,
    getUserByEmail,
    deleteUserById,
    getAllUsers,
    signOutUser,
};
