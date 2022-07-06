import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: 'String',
        unique: true
    },
    email: {
        type: 'String',
        unique: true
    },
    password: {
        type: 'String'
    },
    roomsCodes: {
        type: '[String]'
    }
});

const User = mongoose.model('User', userSchema);
