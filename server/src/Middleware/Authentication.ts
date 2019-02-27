import { Request, Response, NextFunction } from "express";
import JWT from "../Utils/JWT";

// load up the user model
import User from "../Models/User";

export default async (req: Request, res: Response, next: NextFunction) => {
	let accessToken: any;
	let refreshToken: any;
	let getClaimData: any;

	accessToken = req.headers.authorization;

	if (accessToken === undefined || !req.cookies.refreshToken) {
		return res
			.status(400)
			.send("Not Authorized")
			.end();
	}

	accessToken = accessToken.split(" ")[1];
	refreshToken = req.cookies.refreshToken;

	try {
		getClaimData = await JWT.verify(accessToken);
	} catch (error) {
		// If we fail the verification let's check the refresh token and refresh the access token
		getClaimData = await JWT.verify(refreshToken);

		const accessExpires = parseInt(
			// @ts-ignore
			process.env.JWT_ACCESS_EXP,
			0
		);

		const newAccessToken = JWT.sign(
			{ _id: getClaimData.userId },
			{
				expiresIn: accessExpires
			}
		);

		res.header("Access-Control-Expose-Headers", "authorization");
		res.header("authorization", "Bearer " + newAccessToken);
	}

	try {
		const findUser = await User.findOne({ id: getClaimData.userId }).exec();

		// @ts-ignore
		req.User = findUser;

		if (findUser) {
			return next();
		}
	} catch (e) {
		// We'll error outside this catch block
	}

	return res
		.status(400)
		.send("Not Authorized")
		.end();
};
