
export
let loggedUser: string = null;

const users = [
    {username: 'fulano', password: '12345678', email: 'fulano@email.net'},
    {username: 'siclano', password: '12345678', email: 'siclano@email.com'}
];

export
const setLoggedUser = (user: string) => {loggedUser = user};

export
function dbInsert(username: string, email: string, password: string) {
    users.push({
                username: username,
                email: email,
                password: password
            });
}

export
function dbSearchByUsername(username: string): object {
    for (let i in users) {
        if (users[i].username === username)
            return users[i];
    }
    return null;
}

export
function dbSearchByEmail(email: string): object {
    for (let i in users) {
        if (users[i].email === email)
            return users[i];
    }
    return null;
}
