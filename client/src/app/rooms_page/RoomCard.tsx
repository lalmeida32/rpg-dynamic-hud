import classes from './RoomCard.module.css';
import locked from 'shared/images/locked.svg';
import closed_book from 'shared/images/closed_book.svg';
import { Button } from 'shared/components/Button';
import React from 'react';

export 
class RoomCard extends React.Component {

    constructor(props) {
        super(props);
        this.room = props.room;
        this.lock = this.room.isPrivate() ? <img src={locked} /> : null;
    }

    render() {
        return (
            <div className={classes.room_card}>
              <div className={classes.card_buttons}>
                {this.lock}
                <img src={closed_book} />
              </div>
              <p>{this.room.getName()}</p>
              <p>#{this.room.getId()}</p>
              <p>Owned by {this.room.getOwner()}</p>
              <Button text="Enter" />
            </div>
        )}
}
