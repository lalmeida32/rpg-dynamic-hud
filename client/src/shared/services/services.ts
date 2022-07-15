import { IAuthService } from './IAuthService';
import { IEmailService } from './IEmailService';
import { EmailService } from './impl/EmailService';
import { IRoomPaginationService } from './IRoomPaginationService';
import { IRoomService } from './IRoomService';
import { IUserService } from './IUserService';
import { AuthService } from './impl/AuthService';
import { RoomPaginationService } from './impl/RoomPaginationService';
import { RoomService } from './impl/RoomService';
import { UserService } from './impl/UserService';

interface IServices {
  auth: IAuthService;
  roomPagination: IRoomPaginationService;
  user: IUserService;
  email: IEmailService;
  room: IRoomService;
}

export const services: IServices = {
  auth: AuthService.getInstance(),
  roomPagination: RoomPaginationService.getInstance(),
  user: UserService.getInstance(),
  email: EmailService.getInstance(),
  room: RoomService.getInstance(),
};
