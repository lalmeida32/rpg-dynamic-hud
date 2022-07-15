import { useCallback, useContext, useEffect, useState } from 'react';
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
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { CreateRoomAlertContent } from './CreateRoomAlertContent';

export const Rooms = () => {
  /* STATE */
  const params = useParams();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [pages, setPages] = useState<[number, IRoomCardModel[]] | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);

  /* LOGIC */

  const handleSearchForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const query = target['query'].value;
      setQuery(query ? query : null);
    },
    []
  );

  // Setting current page
  useEffect(() => {
    setCurrentPage(Number(params.page));
  }, [params]);

  // Search for room page information
  useEffect(() => {
    if (
      userLogin.username !== null &&
      userLogin.token !== null &&
      currentPage !== null
    )
      (query === null
        ? services.roomPagination.roomCardPagination(
            userLogin.token,
            userLogin.username,
            currentPage
          )
        : services.roomPagination.roomCardPaginationWithSearch(
            userLogin.token,
            query,
            currentPage
          )
      )
        .then(([pageCount, cards]) => {
          setPages([pageCount, cards]);
        })
        .catch(e => {
          if (e instanceof Error) {
            currentAlert.setAlert(
              <DefaultAlertContent text={e.message} error />
            );
          }
        });
  }, [currentAlert, currentPage, query, userLogin.token, userLogin.username]);

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
          <form className={classes.search_form} onSubmit={handleSearchForm}>
            <TextLikeInput type="text" name="query" />
            <Button text="Search" type="submit" />
          </form>
          <Button
            className={classes.create_room_button}
            text="Create room"
            onClick={() => currentAlert.setAlert(<CreateRoomAlertContent />)}
          />
        </div>
        {currentPage !== null && pages !== null ? (
          <div className={classes.room_pagination}>
            <RoomSelection cards={pages[1]} />
            <div className={classes.page_selection}>
              <Button
                text="<<"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Button
                text="<"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <p>Page {currentPage}</p>
              <Button
                text=">"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pages[0]}
              />
              <Button
                text=">>"
                onClick={() => setCurrentPage(pages[0])}
                disabled={currentPage === pages[0]}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
