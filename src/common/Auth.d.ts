export interface ISignUpFields {
	username: string;
	password: string;
	email_address: string;
	first_name: string;
	last_name: string;
}

export interface IUserData extends ISignUpFields {
	password?: never;
	_id: string;
	iat: number;
	exp: number;
	jti: string;
}
