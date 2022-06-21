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
    owner: 'johnsmith',
    private: true,
    opened: false,
  },
  '1342': {
    name: 'Dungeons 2',
    owner: 'johnsmith',
    private: true,
    opened: false,
  },
  '1343': {
    name: 'Dungeons 3',
    owner: 'johnsmith',
    private: true,
    opened: false,
  },
  '3991': {
    name: 'Cyberpunk',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3992': {
    name: 'Cyberpunk 2',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3993': {
    name: 'Cyberpunk 3',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3994': {
    name: 'Cyberpunk 4',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3995': {
    name: 'Cyberpunk 5',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3996': {
    name: 'Cyberpunk 6',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3997': {
    name: 'Cyberpunk 7',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3998': {
    name: 'Cyberpunk 8',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '3999': {
    name: 'Cyberpunk 9',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '4000': {
    name: 'Cyberpunk 10',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '4001': {
    name: 'Cyberpunk 11',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '4002': {
    name: 'Cyberpunk 12',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
  '4003': {
    name: 'Cyberpunk 13',
    owner: 'jackfreeman',
    private: false,
    opened: true,
  },
};
