import { IAuthService } from './IAuthService';
import { IEmailService } from './IEmailService';
import { EmailService } from './impl/EmailService';
import { IRoomPaginationService } from './IRoomPaginationService';
import { IRoomService } from './IRoomService';
import { IUserService } from './IUserService';
import { AuthServiceMock } from './mock/AuthServiceMock';
import { RoomPaginationServiceMock } from './mock/RoomPaginationServiceMock';
import { RoomServiceMock } from './mock/RoomServiceMock';
import { UserService } from './impl/UserService';

interface IServices {
  auth: IAuthService;
  roomPagination: IRoomPaginationService;
  user: IUserService;
  email: IEmailService;
  room: IRoomService;
}

export const services: IServices = {
  auth: AuthServiceMock.getInstance(),
  roomPagination: RoomPaginationServiceMock.getInstance(),
  user: UserService.getInstance(),
  email: EmailService.getInstance(),
  room: RoomServiceMock.getInstance(),
};
