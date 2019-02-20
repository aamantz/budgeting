import { Request, Response } from "express";
import User from "../Models/User";
import config from "../Config/Database";
import * as jwt from "jsonwebtoken";

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
            console.log(err);
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = jwt.sign(user.toJSON(), config.secret);
              // return the information including token as JSON
              res.json({ success: true, token: "JWT " + token });
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
}

export default new Authentication();
