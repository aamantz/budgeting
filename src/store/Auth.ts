import axios from "axios";
import { ISignUpFields } from '../common/Auth.d';

interface ILoginParameters {
	username: string;
	password: string;
}

interface IStateProps {
	jwt: string;
}

const state: IStateProps = {
	jwt: ""
};

const getter = {};

const mutations = {
	setJwt(s: IStateProps, jwt: string) {
		s.jwt = jwt;
	}
};

const actions = {
	doLogin(context: any, { username, password }: ILoginParameters) {
		return new Promise(async (resolve, reject) => {
			let login;
			try {
				login = await axios.post(
					"/api/signin",
					{
						username,
						password
					}
				);

				context.commit("setJwt", login.data.token);
				resolve();
			} catch (e) {
				reject(e.response.data.msg);
			}
		});
	},
	doSignUp( context: any, signupFields: ISignUpFields ) {
		return new Promise( async ( resolve, reject ) => {
			let signup;

			try {
				signup = await axios.post( '/api/signup', signupFields);

				resolve();
			} catch( e ) {
				reject( e.response.data.msg );
			}
		} );
	}
};

export { state, getter, mutations, actions };
