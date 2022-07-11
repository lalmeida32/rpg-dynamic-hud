import Room from '../models/room.js'
import mongoose from 'mongoose';

const { Schema } = mongoose;

async function getLastRoomId(): Promise<number> {
    const room = await Room.findOne({}, null, {sort: {code: -1}});
    if (!room)
        return 0;
    return room.code;
}

export
const roomFind = async (code: number) => {
    const room = await Room.findOne({code: code}); 
    return room;
};

export
const roomCreate = async (username: String, name: String, bars: Array<any>, 
                    attrs: Array<any>, dices: Array<number>) => {

    const newCode = (await getLastRoomId()) + 1;

    const room = new Room({
       code: newCode,
       name: name,
       owner: username,
       opened: true,
       statusBars: bars,
       attributes: attrs,
       characters: [],
       dices: dices
    });
    console.log(room);
    room.save().then(() => {
        console.log('Room saved!');
    });

};

export
const roomAddCharacter = async (username: string, roomCode: number) => {
    await Room.updateOne({code: roomCode}, {'$push': {'characters': username}});

};
