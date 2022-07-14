import User from '../models/user.js'

import sha256 from 'crypto-js/sha256.js'


const SALT = 'b9fa10c0ee8bfa49ddcF';

function encryptPassword(passwd: String): String {
    const encPass = sha256(SALT+passwd);
    return encPass.toString();
}
export
const userFind = async (username: String) => {
    const user = await User.findOne({username: username});
    if (!user)
        throw new Error("User does not exists!");
    return user;
}


export
const userCreate = (username: String, email: String, password: String) => {
    const newUser = new User({
        username: username,
        email: email,
        password: encryptPassword(password)
    });
    console.log(newUser);
    newUser.save().then(() => {
        console.log('User saved!');
    });
}

export
const userInRoom = async (username: String, roomCode: number): Promise<boolean> => {
    const user = await userFind(username);

    for (let room of user.roomsCodes)
        if (room === roomCode)
            return true;

    return false;
}

export
const userJoinRoom = async (username: string, roomCode: number) => {
    const user = await userFind(username);
    if (roomCode in user.roomsCodes)
        throw new Error('User already in this room!');
    user.roomsCodes.push(roomCode);
    await user.save();
}

export
const userLeaveRoom = async (username: string, roomCode: number) => {
    const user = await userFind(username);
    if (roomCode in user.roomsCodes)
        throw new Error('User already in this room!');
    user.roomsCodes = user.roomsCodes.filter(room => room != roomCode);
    await user.save();
};

export
const userLogin = async (username: String, password: String) => {
    const user = await userFind(username);
    const encPass = encryptPassword(password);
    if (!user)
        return null;
    return encPass === user.password;
}


