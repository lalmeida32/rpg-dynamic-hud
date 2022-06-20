interface IRoom {
  owner: string;
  private: boolean;
  opened: boolean;
  name: string;
}

interface IRoomDb {
  [key: string]: IRoom;
}

export const roomDb: IRoomDb = {
  '1341': {
    name: 'Dungeons',
    owner: 'John Smith',
    private: true,
    opened: false,
  },
  '3991': {
    name: 'Cyberpunk',
    owner: 'Jack Freeman',
    private: false,
    opened: true,
  },
};
