import mongoose from 'mongoose';

const { Schema } = mongoose;

export const characterSchema = new Schema({
  ownerUsername: {
    type: 'String',
  },
  name: {
    type: 'String',
  },
  roomCode: {
    type: Number,
  },
  state: {
    type: [Map],
  },
  image: {
    type: 'String', // base64 img
  },
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
