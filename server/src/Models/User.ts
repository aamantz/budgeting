import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
    },
    email_address: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
});

UserSchema.pre("save", function(next) {
	const user = this;
	if (this.isModified("password") || this.isNew) {
		bcrypt.genSalt(10, (err: any, salt: any) => {
			if (err) {
				return next(err);
			}
			// @ts-ignore
			bcrypt.hash(user.password, salt, null, (err: any, hash: any) => {
				if (err) {
					return next(err);
				}
				// @ts-ignore
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

UserSchema.methods.comparePassword = (passw: any, user: any, cb: any) => {
	// @ts-ignore
	bcrypt.compare(passw, user.password, (err: any, isMatch: any) => {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

export default mongoose.model("User", UserSchema);
