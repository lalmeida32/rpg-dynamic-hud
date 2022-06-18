import { dbSearchByUsername, dbSearchByEmail } from 'mocks/database'

export 
function login(username: string, password: string): boolean {
    
    const user = dbSearchByUsername(username);
    if (user)
        return user.password === password;

    return false;
}
