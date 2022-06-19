import { dbSearchByUsername } from 'mocks/userdb'

const rooms = {
    1341: {name: 'Dangeons', owner: 'fulano', priv: true, players: ['ciclano', 'fulano'], maxPlayers: 10},
    3991: {name: 'Cyberpunk', owner: 'fulano', priv: false, players: ['fulano'], maxPlayers: 6}
};

export
function roomsInsert(id: number, name: string, owner: string, 
        priv: boolean, players: string[], maxPlayers: number): number {

    if (!dbSearchByUserName(owner))
        throw new Error('Owner user does not exist!');

    rooms[id] = {
            name: name,
            owner: owner,
            priv: priv,
            players: players,
            maxPlayers: maxPlayers
    };

    return id;
}

export
function roomsAddPlayer(room: id, user: string) {
    rooms[id].players.push(user);
}

export
function roomsRemovePlayer(room: id, user: string) {
    delete rooms[id].players[players.indexOf(user)];
}

export
function roomsAlterName(room: id, name: string) {
    rooms[id].name = name;
}

export
function roomsDelete(room: id) {
    delete rooms[id];
}

export
function roomsByOwner(user: string): object[] {
    let r = []; let i=0;
    for (let id in rooms)
        if (rooms[id].owner === user) {
            r.push(rooms[id]);
            r[i++].id = id;
        }
    return r;
}

export
function roomById(id: number): object {
    return rooms[id];
}
