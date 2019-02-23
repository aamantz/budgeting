import axios from "axios";
import { ISignUpFields, IUserData } from "../common/Auth.d";

interface ILoginParameters {
	email_address: string;
	password: string;
}

interface IStateProps {
	jwt: string;
	user: IUserData;
}

const state: IStateProps = {
	jwt: "",
	user: {
		email_address: '',
		first_name: '',
		last_name: '',
		_id: '',
		iat: 0,
		exp: 0,
		jti: ''
	}
};

const getter = {};

const mutations = {
	setJwt(s: IStateProps, jwt: string) {
		s.jwt = jwt;
	},
	setUser( s: IStateProps, user: IUserData ) {
		s.user = user;
	}
};

const actions = {
	doLogin({ commit, dispatch }: any, { email_address, password }: ILoginParameters) {
		return new Promise(async (resolve, reject) => {
			let login;
			try {
				login = await axios.post("/api/signin", {
					email_address,
					password
				});

				commit("setJwt", login.data.token);
				dispatch( 'parseToken' );
				resolve();
			} catch (e) {
				reject(e.response.data.msg);
			}
		});
	},
	doSignUp(context: any, signupFields: ISignUpFields) {
		return new Promise(async (resolve, reject) => {
			let signup;

			try {
				signup = await axios.post("/api/signup", signupFields);

				resolve();
			} catch (e) {
				reject(e.response.data.msg);
			}
		});
	},
	// tslint:disable-next-line: no-shadowed-variable
	parseToken({ commit, state }: any) {
		const base64Url = state.jwt.split(".")[1];
		const base64 = base64Url.replace("-", "+").replace("_", "/");
		const parsedToken = JSON.parse(window.atob(base64));
		commit( 'setUser', parsedToken );
	}
};

export { state, getter, mutations, actions };
