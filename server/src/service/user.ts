import User from '../models/user.js'

import sha256 from 'crypto-js/sha256.js'


const SALT = 'b9fa10c0ee8bfa49ddcF';

function encryptPassword(passwd: String): String {
    const encPass = sha256(SALT+passwd);
    return encPass.toString();
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
const userFind = async (username: String) => {
    const user = await User.findOne({username: username});
    return user;
}

export
const userLogin = async (username: String, password: String) => {
    const user = await userFind(username);
    const encPass = encryptPassword(password);
    if (!user)
        return null;
    return encPass === user.password;
}


