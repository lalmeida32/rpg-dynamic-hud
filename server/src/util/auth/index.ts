import express from 'express';
import jwt from 'jsonwebtoken';
import { serverSettings } from 'util/server_settings_config';

export const getToken = (req: express.Request) => {
  const token = req.header('x-auth-token');
  return token ? token : '';
};

export const generateToken = (username: string) => {
  return jwt.sign({ username }, serverSettings.jwt_privatekey);
};

export const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, serverSettings.jwt_privatekey);
    return typeof decoded === 'string' ? '' : (decoded.username as string);
  } catch (e) {
    throw new Error('Invalid token.');
  }
};
