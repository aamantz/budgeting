import { IUser } from "./User";
import { Request as req } from 'express';

declare global {
	namespace Express {
		interface Request  {
			User: IUser
		}
	}
}