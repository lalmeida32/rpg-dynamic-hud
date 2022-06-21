export const validateEmail = (email: string) => {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) return true;
  return false;
};
