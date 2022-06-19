import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { RoomCard } from './RoomCard';
import gear from 'shared/images/gear.svg';
import classes from './Rooms.module.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRooms } from 'services/room.tsx'
import { loggedUser } from 'mocks/userdb.tsx';

export 
class Rooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: getUserRooms() 
        };
    }

    represhRooms() {
        this.setState({rooms: getUserRooms()});
    }


    renderRooms() {
        let rooms = [];
        for (let room of this.state.rooms) 
            rooms.push(<RoomCard room={room} />);
        return rooms;
    }

    render() {
        return (
            <div className={classes.rooms_container}>
            <div className={classes.rooms}>
            <img src={gear} />
            <p>Hello, {loggedUser}</p>
            <div className={classes.header_buttons}>
              <form className={classes.search_form}>
                <TextLikeInput type="text" />
                <Button text="Search" type="submit" />
              </form>
              <Button className={classes.create_room_button} text="Create room" />
            </div>
            <div className={classes.room_pagination}>
              <div className={classes.room_selection}>
                {this.renderRooms()}
              </div>
              <div className={classes.page_selection}>
                <Button text="<<" />
                <Button text="<" />
                <p>Page 1</p>
                <Button text=">" />
                <Button text=">>" />
              </div>
            </div>
          </div>
        </div>
        )
      }
};
