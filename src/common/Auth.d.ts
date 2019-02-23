export interface ISignUpFields {
	password?: string;
	email_address: string;
	first_name: string;
	last_name: string;
}

export interface IUserData extends ISignUpFields {
	_id: string;
	iat: number;
	exp: number;
	jti: string;
}
