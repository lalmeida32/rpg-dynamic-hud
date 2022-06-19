import { dbInsert, dbSearchByUsername, dbSearchByEmail } from 'mocks/userdb'


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
function signup(username: string, email: string, password: string) {
   
    
    validate(username, email, password);

    if (dbSearchByEmail(email))
        throw new Error('Email already exists!');

    if (dbSearchByUsername(username))
        throw new Error('Username already exists!');

    
    dbInsert(username, email, password);
}
