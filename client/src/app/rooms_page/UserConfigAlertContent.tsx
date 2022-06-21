import React, { useContext } from 'react';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { UserLoginContext } from 'shared/contexts/UserLogin';
// import classes from './UserConfigAlertContent.module.css';

export const UserConfigAlertContent = () => {
  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);
  return (
    <React.Fragment>
      <Button
        text="Logout"
        onClick={() => {
          userLogin.logout();
          currentAlert.closeAlert();
        }}
      />
      <h3>User update</h3>
      <form
        onSubmit={async e => {
          e.preventDefault();
          // const target = e.target as HTMLFormElement;
          // const username = target['username'].value;
          // const email = target['email'].value;
        }}
      >
        <TextLikeInput placeholder="Username" name="username" />
        <TextLikeInput placeholder="E-mail" type="email" name="email" />
        <Button text="Update" type="submit" />
      </form>
      <h3>Change password</h3>
      <form>
        <TextLikeInput
          placeholder="Old password"
          type="password"
          name="oldPassword"
        />
        <TextLikeInput
          placeholder="New password"
          type="password"
          name="newPassword"
        />
        <TextLikeInput
          placeholder="Confirm new password"
          type="password"
          name="confirmNewPassword"
        />
        <Button text="Update" type="submit" />
      </form>
      <h3>Delete Account</h3>
      <form>
        <TextLikeInput placeholder="Username" name="username" />
        <Button text="Delete Account" type="submit" />
      </form>
    </React.Fragment>
  );
};
