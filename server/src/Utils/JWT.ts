import * as jwt from "jsonwebtoken";
import config from "../Config/Database";

interface ITokenClaims {
  iat?: string;
  exp?: string;
  name: string;
  userId: string;
}

class JWT {
  private secretOrPublicKey: string;
  private options: string[];

  constructor(secretOrPublicKey: string, options?: string[]) {
    this.secretOrPublicKey = secretOrPublicKey;

    if (options !== undefined) {
      this.options = options; // algorithm + keyid + noTimestamp + expiresIn + notBefore
    }
  }

  public sign(payload, signOptions) {
    const jwtSignOptions = Object.assign({}, signOptions, this.options);
    return jwt.sign(payload, this.secretOrPublicKey, jwtSignOptions);
  }

  public async verify(token): Promise<ITokenClaims> {
    // @ts-ignore
    return await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.secretOrPublicKey,
        (error, claim: ITokenClaims) => {
          if (error) {
            reject(error);
          }

          resolve(claim);
        }
      );
    });
  }

  public refresh(token, refreshOptions) {
    // @ts-ignore
    const payload: ITokenClaims = jwt.verify(token, this.secretOrPublicKey, {
      ignoreExpiration: true
    });

    delete payload.iat;
    delete payload.exp;

    // The first signing converted all needed options into claims, they are already in the payload
    return this.sign(payload, refreshOptions);
  }
}

export default new JWT(config.secret);
