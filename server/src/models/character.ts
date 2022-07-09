import mongoose from 'mongoose';

const { Schema } = mongoose;

export
const characterSchema = new Schema({
    ownerUsername: {
        type: 'String'
    },
    roomCode: {
        type: 'String'
    },
    state: {
        type: 'String'
    },
    image: {
        type: 'Buffer'
    }
});

const Character = mongoose.model('Character', characterSchema);
