export const validateEmail = (email: string) => {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) return true;
  return false;
};

export const validateUsername = (username: string) => {
  return username.length >= 4;
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};
