import mongoose from 'mongoose';

const Order = new mongoose.Schema(
    {
        email: {
            type: String,
            null: false,
        },
        name: {
            type: String,
            null: false,
        },
        amount: {
            type: String,
            null: false,
        },
        container: {
            type: String,
            null: false,
        },
        message: {
            type: String,
            null: true,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('Order', Order);
