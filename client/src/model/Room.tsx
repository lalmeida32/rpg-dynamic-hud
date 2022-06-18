


class Room {
    private name: string;
    private creator: User;
    private maxPlayers: number;
    private characters: Character[];
    private code: string;

    constructor(name: string, creator: User) {
        this.name = name;
        this.creator = creator;
        this.characters: Character[] = [];
    }

    public getCode(): string {
        return this.code;
    }

    public getName(): string {
        return this.name;
    }

    public getCreator(): User {
        return this.creator;
    }

    public getCharacters(): Character[] {
        return this.characters.slice();
    }

    public addCharacter(character: Character) {
        if (this.characters.length >= this.maxPlayers)
            throw new Error("Full Room");
        
        this.characters.push(character);
    } 

}
