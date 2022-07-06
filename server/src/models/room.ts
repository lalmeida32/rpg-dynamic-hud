import mongoose from 'mongoose';
import { characterSchema } from './character.js'

const { Schema } = mongoose;

const roomSchema = new Schema({
    code: {
        type: 'String',
        unique: true
    },
    name: {
        type: 'String'
    },
    owner: {
        type: 'String'
    },
    opened: {
        type: 'Boolean'
    },
    statusBars: {
        type: '[Map]'
    },
    characters: {
        type: [characterSchema]
    },
    dices: {
        type: '[Map]'
    }

});

const Room = mongoose.model('Room', roomSchema);
