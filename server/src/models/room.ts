import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
  code: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: 'String',
    required: true,
  },
  owner: {
    type: 'String',
    required: true,
  },
  opened: {
    type: 'Boolean',
    default: true,
  },
  statusBars: {
    type: [Map],
    default: [],
  },
  attributes: {
    type: [Map],
    default: [],
  },
  characters: {
    type: [String],
    default: [],
  },
  dices: {
    type: [Number],
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
