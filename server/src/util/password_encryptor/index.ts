import sha256 from 'crypto-js/sha256.js';

const CONSTANT = 'b9fa10c0ee8bfa49ddcF';

export const passwordEncryptor = (password: string) => {
  return sha256(CONSTANT + password).toString();
};
