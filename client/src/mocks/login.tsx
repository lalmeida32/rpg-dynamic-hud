import { loggedUser, setLoggedUser, dbSearchByUsername, dbSearchByEmail } from 'mocks/userdb'

export 
function login(username: string, password: string): boolean {
    
    const user = dbSearchByUsername(username);
    if (user) {
        if (user.password === password)
            setLoggedUser(user.username);
        return user.password === password;
    }
    return false;
}
