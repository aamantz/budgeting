import { Request, Response } from "express";
import User from "../Models/User";
import JWT from "../Utils/JWT";
import * as dotenv from 'dotenv';

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
								// @ts-ignore
								const expires = parseInt(process.env.JWT_EXP, 0);
								// console.log( expires );
								
								// if user is found and password is right create a token
								const token = JWT.sign(user.toJSON(), {
									expiresIn: expires,
								});

								// return the information including token as JSON
								res.cookie("accessToken", token, {
									maxAge: expires * 1000,
									httpOnly: true
								}).json({
									success: true,
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
			expiresIn: parseInt(process.env.JWT_EXP, 0)
		});

		res.json({ success: true, token: "Bearer " + newToken });
	}

	/**
	 * Refresh Token
	 */
	public async VerifyToken(req: Request, res: Response) {
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

			const findUser = await User.findOne({
				id: getClaimData.userId
			}).exec();

			if (findUser) {
				res.json({ success: true, user: findUser.toJSON() });
			}
		} catch (error) {
			res.json({ success: false });
		}

		res.json({ success: false });
	}
}

export default new Authentication();
