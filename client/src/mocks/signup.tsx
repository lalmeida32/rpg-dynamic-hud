import { dbInsert, dbSearchByUsername, dbSearchByEmail } from 'mocks/userdb'


export 
function signup(username: string, email: string, password: string) {
   
    if (dbSearchByEmail(email))
        throw new Error('Email already exists!');

    if (dbSearchByUsername(username))
        throw new Error('Username already exists!');

    
    dbInsert(username, email, password);
}
