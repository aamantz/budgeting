import { Request, Response } from "express";
import User from "../Models/User";
import JWT from "../Utils/JWT";
import * as dotenv from "dotenv";

// Setup ENV from .env
dotenv.config();

class Authentication {
	/**
	 * Signup for user account
	 */
	public SignUp(req: Request, res: Response) {
		if (!req.body.email_address || !req.body.password) {
			res.status(401).send({
				success: false,
				msg: "Please pass email address and password."
			});
		} else {
			const newUser = new User({
				email_address: req.body.email_address,
				password: req.body.password,
				first_name: req.body.first_name,
				last_name: req.body.last_name
			});
			// save the user
			newUser.save((err: any) => {
				if (err) {
					return res.status(401).send({
						success: false,
						msg: "Username already exists."
					});
				}
				res.status(200).send({
					success: true,
					msg: "Successful created new user."
				});
			});
		}
	}

	/**
	 * Sign In
	 */
	public SignIn(req: Request, res: Response) {
		User.findOne(
			{
				email_address: req.body.email_address
			},
			(err, user: any) => {
				if (err) throw err;

				if (!user) {
					res.status(401).send({
						success: false,
						msg: "Authentication failed. User not found."
					});
				} else {
					// check if password matches
					user.comparePassword(
						req.body.password,
						user,
						(err, isMatch) => {
							if (isMatch && !err) {
								const refreshExpires = parseInt(
									// @ts-ignore
									process.env.JWT_REFRESH_EXP,
									0
								);

								const accessExpires = parseInt(
									// @ts-ignore
									process.env.JWT_ACCESS_EXP,
									0
								);

								const refreshToken = JWT.sign(
									{ _id: user._id },
									{
										expiresIn: refreshExpires
									}
								);

								const accessToken = JWT.sign(
									{ _id: user._id },
									{
										expiresIn: accessExpires
									}
								);

								// return the information including token as JSON
								res.cookie("refreshToken", refreshToken, {
									maxAge: refreshExpires * 1000,
									httpOnly: true
								}).json({
									success: true,
									accessToken,
									user: user.toJSON()
								});
							} else {
								res.status(401).send({
									success: false,
									msg:
										"Authentication failed. Wrong password."
								});
							}
						}
					);
				}
			}
		);
	}

	/**
	 * Refresh Token
	 */
	public RefreshToken(req: Request, res: Response) {
		let token: string;

		if (!req.cookies.accessToken) {
			return res
				.status(400)
				.send("Not Authorized")
				.end();
		}

		token = req.cookies.accessToken;

		const newToken = JWT.refresh(token, {
			// @ts-ignore
			expiresIn: parseInt(process.env.JWT_ACCESS_EXP, 0)
		});

		res.json({ success: true, token: "Bearer " + newToken });
	}

	/**
	 * Refresh Token
	 */
	public async VerifyToken(req: Request, res: Response) {
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

			console.log("new token", newAccessToken);

			res.header("Access-Control-Expose-Headers", "authorization");
			res.header("authorization", "Bearer " + newAccessToken);
		}

		try {
			const findUser = await User.findOne({
				id: getClaimData.userId
			}).exec();

			// @ts-ignore
			req.User = findUser;

			if (findUser) {
				res.json({ success: true, user: findUser.toJSON() });
			}
		} catch (e) {
			// We'll error outside this catch block
		}

		res.json({ success: false });
	}
}

export default new Authentication();
