import mongoose from 'mongoose';

const UserQuestion = new mongoose.Schema(
    {
        email: {
            type: String,
            null: false,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('UserQuestion', UserQuestion);
