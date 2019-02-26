import { Request, Response, NextFunction } from "express";
import JWT from "../Utils/JWT";

// load up the user model
import User from "../Models/User";

export default async (req: Request, res: Response, next: NextFunction) => {
	let token: string;

	if (!req.cookies.accessToken) {
		return res
			.status(400)
			.send("Not Authorized")
			.end();
	}

	token = req.cookies.accessToken;

	try {
		const getClaimData = await JWT.verify(token);

		const findUser = await User.findOne({ id: getClaimData.userId }).exec();

		// @ts-ignore
		req.User = findUser;

		if (findUser) {
			return next();
		}
	} catch (error) {
		return res
			.status(400)
			.send("Not Authorized")
			.end();
	}

	return res
		.status(400)
		.send("Not Authorized")
		.end();
};
