import { IAuthService } from './IAuthService';
import { IEmailService } from './IEmailService';
import { IRoomPaginationService } from './IRoomPaginationService';
import { IUserService } from './IUserService';
import { AuthServiceMock } from './mock/AuthServiceMock';
import { EmailServiceMock } from './mock/EmailServiceMock';
import { RoomPaginationServiceMock } from './mock/RoomPaginationServiceMock';
import { UserServiceMock } from './mock/UserServiceMock';

interface IServices {
  auth: IAuthService;
  roomPagination: IRoomPaginationService;
  user: IUserService;
  email: IEmailService;
}

export const services: IServices = {
  auth: AuthServiceMock.getInstance(),
  roomPagination: RoomPaginationServiceMock.getInstance(),
  user: UserServiceMock.getInstance(),
  email: EmailServiceMock.getInstance(),
};
