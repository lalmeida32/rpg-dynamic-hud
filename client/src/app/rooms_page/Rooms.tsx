import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import gear from 'shared/images/gear.svg';
import classes from './Rooms.module.css';
import { RoomSelection } from './RoomSelection';
import { services } from 'shared/services/services';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { UserConfigAlertContent } from './UserConfigAlertContent';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';

export const Rooms = () => {
  /* STATE */
  const params = useParams();
  const [pageCount, setPageCount] = useState<[number, number] | null>(null);
  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);

  /* LOGIC */

  // Search for room page information
  useEffect(() => {
    if (userLogin.username !== null)
      services.roomPagination
        .roomPageCount(userLogin.token || '', userLogin.username)
        .then(pageCount => {
          let pageNumber = Number(params.page);
          if (
            isNaN(pageNumber) ||
            !Number.isInteger(pageNumber) ||
            pageNumber <= 0
          )
            pageNumber = 1;
          setPageCount([pageNumber, pageCount]);
        })
        .catch(e => {
          if (e instanceof Error) {
            currentAlert.setAlert(
              <DefaultAlertContent text={e.message} error />
            );
          }
        });
  }, [userLogin, params, currentAlert]);

  /* VIEW */
  return (
    <div className={classes.rooms_container}>
      <div className={classes.rooms}>
        <img
          className={classes.config_button}
          src={gear}
          onClick={() => currentAlert.setAlert(<UserConfigAlertContent />)}
        />
        <p>Hello, @{userLogin.username}</p>
        <div className={classes.header_buttons}>
          <form
            className={classes.search_form}
            onSubmit={e => e.preventDefault()}
          >
            <TextLikeInput type="text" />
            <Button text="Search" type="submit" />
          </form>
          <Button className={classes.create_room_button} text="Create room" />
        </div>
        {pageCount !== null ? (
          <div className={classes.room_pagination}>
            <RoomSelection page={pageCount[0]} />
            <div className={classes.page_selection}>
              <Button
                text="<<"
                onClick={() => setPageCount([1, pageCount[1]])}
                disabled={pageCount[0] === 1}
              />
              <Button
                text="<"
                onClick={() => setPageCount([pageCount[0] - 1, pageCount[1]])}
                disabled={pageCount[0] === 1}
              />
              <p>Page {pageCount[0]}</p>
              <Button
                text=">"
                onClick={() => setPageCount([pageCount[0] + 1, pageCount[1]])}
                disabled={pageCount[0] === pageCount[1]}
              />
              <Button
                text=">>"
                onClick={() => setPageCount([pageCount[1], pageCount[1]])}
                disabled={pageCount[0] === pageCount[1]}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
