import { User } from 'model/User'


function validate(username: string, email: string, password: string) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexEmail))
        throw new Error('Invalid Email');

    if (username > 4)
        throw new Error('Username must have at least 4 characters.');

    if (password.length < 8)
        throw new Error('Password must have at least 8 characters');

}


export
const userAuthenticate: string = (username: string, password: string) => {
    const user = new User(username, username, password);
    user.auth();
    return user.token;
}

export
const userCreate = (username: string, email: string, 
                    password: string) => {

    validate(username, email, password);
    console.log(username);
    const user = new User(username, email, password);
    console.log('fora: '+user.getUsername());
    user.commit();
}
