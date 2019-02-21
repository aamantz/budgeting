import { Request, Response } from "express";
import User from "../Models/User";
import JWT from "../Utils/JWT";

class Authentication {
  /**
   * Signup for user account
   */
  public SignUp(req: Request, res: Response) {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: "Please pass username and password." });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save((err: any) => {
        if (err) {
          return res.json({ success: false, msg: "Username already exists." });
        }
        res.json({ success: true, msg: "Successful created new user." });
      });
    }
  }

  /**
   * Sign In
   */
  public SignIn(req: Request, res: Response) {
    User.findOne(
      {
        username: req.body.username
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
          user.comparePassword(req.body.password, user, (err, isMatch) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = JWT.sign(user.toJSON(), {
                expiresIn: 60 * 1
              });
              // return the information including token as JSON
              res.json({ success: true, token: "Bearer " + token });
            } else {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      }
    );
  }

  /**
   * Refresh Token
   */
  public RefreshToken(req: Request, res: Response) {
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

    const newToken = JWT.refresh(token, {
      expiresIn: 60 * 5
    });

    res.json({ success: true, token: "Bearer " + newToken });
  }
}

export default new Authentication();
