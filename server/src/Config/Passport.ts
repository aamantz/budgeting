import * as PassportJwt from "passport-jwt";

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

// load up the user model
import User from "../Models/User";
import config from "./Database"; // get db config file

export default (passport: any) => {
  let opts: PassportJwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
  };

  passport.use(
    new JwtStrategy(opts, (jwt_payload: any, done: any) => {
      User.findOne({ id: jwt_payload.id }, (err: any, user: any) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
