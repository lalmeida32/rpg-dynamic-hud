import { Room, getRoomsByOwner } from 'model/Room';
import { User } from 'model/User';
import { loggedUser } from 'mocks/userdb.tsx';


export
const getUserRooms: Room[] = () => {
    if (!loggedUser)
        throw new Error("User aren't logged.");
    const rooms = getRoomsByOwner(loggedUser);
    return rooms;
}
