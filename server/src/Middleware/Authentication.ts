import { Request, Response, NextFunction } from "express";
import JWT from "../Utils/JWT";

// load up the user model
import User from "../Models/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  // const notAuthorizedStatus = res.status(400).send("Not Authorized").end();
  let token: string;

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    return res
      .status(400)
      .send("Not Authorized")
      .end();
  }

  if (!("authorization" in req.headers)) {
    return res
      .status(400)
      .send("Not Authorized")
      .end();
  }

  // @ts-ignore
  token = req.headers.authorization.split(" ")[1];

  try {
    const getClaimData = await JWT.verify(token);

    const findUser = await User.findOne({ id: getClaimData.userId }).exec();

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
