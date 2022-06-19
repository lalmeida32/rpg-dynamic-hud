import { roomsInsert, roomsByOwner, roomById } from 'mocks/roomsdb'
import { User } from 'model/User.tsx'


class Room {
    private name: string;
    private owner: User;
    private maxPlayers: number;
    private players: Character[];
    private id: number;
    private priv: boolean;

    constructor(id: number, maxPlayers: number, 
                name: string, players: User[], 
                owner: User, priv: boolean) {
        this.name = name;
        this.owner = owner;
        this.players = players.slice();
        this.id = id;
        this.maxPlayers = maxPlayers;
        this.priv = priv
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getOwner(): User {
        return this.owner;
    }

    public getPlayers(): Character[] {
        return this.players.slice();
    }

    public getMaxPlayers(): number {
        return this.maxPlayers;
    }

    public addCharacter(character: Character) {
        if (this.players.length >= this.maxPlayers)
            throw new Error("Full Room");
        
        this.players.push(character);
    }
    public isPrivate(): boolean {
        return this.priv;
    }

}

export
function getRoomsByOwner(user: string): Room[] {
    const rooms = roomsByOwner(user);
    let roomsObj = [];
    for (let i in rooms) {
        roomsObj.push( 
            new Room(
                rooms[i].id,
                rooms[i].maxPlayers,
                rooms[i].name,
                rooms[i].players,
                rooms[i].owner,
                rooms[i].priv
            )
        );
    }
    return roomsObj;
}

export
function getRoomById(id: number): Room {
    try {
        return roomById(id);
    } catch(err) {
        throw new Error('This room does not exists!');
    }
}
