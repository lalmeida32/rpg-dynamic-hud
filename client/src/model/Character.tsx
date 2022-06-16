

class Characters {
    private owner: User;
    private room: Room;
    private state: number;
    private image: string;

    constructor(owner: User, room: Room, state: number, image: string) {
        this.owner = owner;
        this.room = room;
        this.state = state;
        this.image = image;
    }

    public getOwner(): User {
        return this.owner;
    }

    public getRoom(): Room {
        return this.room;
    }

    public getState(): number {
        return self.state;
    }
    public getImage(): string {
        return self.image;
    }

}
