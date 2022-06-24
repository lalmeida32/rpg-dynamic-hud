import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'shared/components/Button';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IUserGetModel } from 'shared/models/IUserGetModel';
import { services } from 'shared/services/services';
import classes from './UserConfigAlertContent.module.css';

export const UserConfigAlertContent = () => {
  /* STATE */
  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);
  const [getUserModel, setGetUserModel] = useState<IUserGetModel | null>(null);

  /* LOGIC */

  const handleUpdateUserForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const username = target['username'].value;
      const email = target['email'].value;

      if (userLogin.token === null || userLogin.username === null) return;

      try {
        await services.user.updateUser(userLogin.token, userLogin.username, {
          username,
          email,
        });
        currentAlert.setAlert(
          <DefaultAlertContent success text="User updated successfully." />
        );
        if (userLogin.username !== username) userLogin.logout();
      } catch (e) {
        if (e instanceof Error)
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
      }
    },
    [userLogin, currentAlert]
  );

  const handleChangePasswordForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const oldPassword = target['oldPassword'].value;
      const newPassword = target['newPassword'].value;
      const confirmNewPassword = target['confirmNewPassword'].value;

      if (userLogin.token === null || userLogin.username === null) return;

      if (newPassword !== confirmNewPassword)
        return currentAlert.setAlert(
          <DefaultAlertContent
            error
            text="Password field does not match with confirm password field."
          />
        );

      try {
        await services.user.updatePassword(
          userLogin.token,
          userLogin.username,
          oldPassword,
          newPassword
        );
        currentAlert.setAlert(
          <DefaultAlertContent success text="Password updated successfully." />
        );
      } catch (e) {
        if (e instanceof Error)
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
      }
    },
    [currentAlert, userLogin]
  );

  const handleDeleteAccountForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
  );

  // Get user information
  useEffect(() => {
    if (userLogin.username !== null && userLogin.token !== null)
      services.user
        .getUser(userLogin.token, userLogin.username)
        .then(user => {
          setGetUserModel(user);
        })
        .catch(e => {
          if (e instanceof Error) {
            currentAlert.setAlert(
              <DefaultAlertContent text={e.message} error />
            );
          }
        });
  }, [userLogin, currentAlert]);

  /* VIEW */
  return (
    <React.Fragment>
      <Button
        className={classes.logout_button}
        text="Logout"
        onClick={() => {
          userLogin.logout();
          currentAlert.closeAlert();
        }}
      />
      <h3 className={classes.title}>User update</h3>
      <form
        className={classes.form + ' ' + classes.user_update_form}
        onSubmit={handleUpdateUserForm}
      >
        <TextLikeInput
          placeholder="Username"
          name="username"
          text={getUserModel?.username || ''}
        />
        <TextLikeInput
          placeholder="E-mail"
          type="email"
          name="email"
          text={getUserModel?.email || ''}
        />
        <Button text="Update" type="submit" />
      </form>
      <h3 className={classes.title}>Change password</h3>
      <form
        className={classes.form + ' ' + classes.change_password_form}
        onSubmit={handleChangePasswordForm}
      >
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
      <h3 className={classes.title}>Delete Account</h3>
      <form
        className={classes.form + ' ' + classes.delete_account_form}
        onSubmit={handleDeleteAccountForm}
      >
        <TextLikeInput
          placeholder="Your password"
          type="password"
          name="password"
        />
        <Button text="Delete" type="submit" />
      </form>
    </React.Fragment>
  );
};
