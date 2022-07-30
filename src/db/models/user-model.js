import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(userId) {
        return await User.findOne({ shortId: userId });
    }

    async create(userInfo) {
        return await User.create(userInfo);
    }

    async findAll() {
        return await User.find({});
    }

    async update({ userId, update }) {
        const filter = { shortId: userId };
        const option = { returnOriginal: false };

        return await User.findOneAndUpdate(filter, update, option);
    }

    async deleteOneUser(userId) {
        //const filter = { userId };

        return await User.deleteOne({ shortId: userId });
    }
}

const userModel = new UserModel();

export { userModel };
