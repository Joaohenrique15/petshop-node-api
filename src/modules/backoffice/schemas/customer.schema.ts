import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
        index: true,
        trim: true,
        unique: true
    },
    createdAt: {
        type: String,
        default: Date.now,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    pets: [
        {
            id: {
                type: String,
            },
            name: {
                type: String,
            },
            gender: {
                type: String,
                enum: ['male', 'female', 'none'],
            },
            kind: {
                type: String,
            },
            brand: {
                type: String,
            },
        },
    ],
    billingAddress: {
        zipcode: {
            type: String,
        },
        street: {
            type: String,
        },
        number: {
            type: String,
        },
        complement: {
            type: String,
        },
        neighborhood: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    shippingAddress: {
        zipcode: {
            type: String,
        },
        street: {
            type: String,
        },
        number: {
            type: String,
        },
        complement: {
            type: String,
        },
        neighborhood: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    card: {
        cardNumber: {
            type: String,
        },
        holder: {
            type: String,
        },
        expiration: {
            type: String,
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});