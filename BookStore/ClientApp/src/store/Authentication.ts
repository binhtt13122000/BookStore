import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import Axios from 'axios';

export interface AuthenticateState {
    isLoading: boolean;
    authenticate: Authenticate;
    status: boolean;
}

export interface Authenticate {
    id?: number;
    email: string;
    name?: string;
    password?: string;
    roleId?: number;
    status?: boolean;
}


export interface RequestLoginAction {
    type: "REQUEST_AUTHENTICATE";
}

export interface LoginSuccessAction {
    type: "LOGIN_SUCCESS";
    authenticate: Authenticate;
}

export interface LoginFailAction {
    type: "LOGIN_FAIL";
}

export interface RequestLogoutAction {
    type: "LOGOUT";
}

export interface SuccessLogout {
    type: "SUCCESS_LOGOUT"
}

export interface FailLogout {
    type: "FAIL_LOGOUT"
}
type KnownAction = RequestLoginAction | LoginSuccessAction | LoginFailAction | RequestLogoutAction | SuccessLogout | FailLogout;

export const actionCreators = {
    logout: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        localStorage.clear();
        dispatch({ type: "SUCCESS_LOGOUT" })
    },
    login: (authenticate: Authenticate, setError: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_AUTHENTICATE" })
        Axios.post("/api/users/login", {
            email: authenticate.email,
            password: authenticate.password
        })
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem("loggedIn", "1");
                dispatch({ type: "LOGIN_SUCCESS", authenticate: res.data })
                }
            })
            .catch(err => {
                if (err.response !== null && err.response !== undefined) {
                    if (err.response.status === 401 || err.response.status === 400) {
                        setError("password", {
                            type: "manual",
                            message: "Email hoặc Mật khẩu không đúng!",
                        })
                    }
                    dispatch({ type: "LOGIN_FAIL" })
                }
            })
    },
};

const unloadedState: AuthenticateState = {authenticate: {email: ""}, isLoading: false, status: false };

export const reducer: Reducer<AuthenticateState> = (state: AuthenticateState | undefined, incomingAction: Action): AuthenticateState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_AUTHENTICATE':
            console.log("request");
            return {
                authenticate: state.authenticate,
                status: false,
                isLoading: true
            };
        case 'LOGIN_SUCCESS':
            console.log("suc");
            return {
                authenticate: action.authenticate,
                isLoading: false,
                status: true,
            };
        case 'LOGIN_FAIL':
            console.log("fail")
            return {
                authenticate: {email: ""},
                status: false,
                isLoading: false
            };
        case 'LOGOUT':
            return {
                authenticate: state.authenticate,
                status: false,
                isLoading: true
            };
        case 'SUCCESS_LOGOUT':
            return {
                authenticate: { email: "" },
                status: false,
                isLoading: false,
            }
        case 'FAIL_LOGOUT':
            return {
                authenticate: state.authenticate,
                status: state.status,
                isLoading: false,
            }
        default:
            return state;
    }
};





