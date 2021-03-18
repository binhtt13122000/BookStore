"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
var axios_1 = require("axios");
exports.actionCreators = {
    logout: function () { return function (dispatch, getState) {
        localStorage.clear();
        dispatch({ type: "SUCCESS_LOGOUT" });
    }; },
    login: function (authenticate, setError) { return function (dispatch, getState) {
        dispatch({ type: "REQUEST_AUTHENTICATE" });
        axios_1.default.post("/api/users/login", {
            email: authenticate.email,
            password: authenticate.password
        })
            .then(function (res) {
            if (res.status === 200) {
                console.log("success");
                dispatch({ type: "LOGIN_SUCCESS", authenticate: res.data });
            }
        })
            .catch(function (err) {
            if (err.response !== null && err.response !== undefined) {
                if (err.response.status === 401 || err.response.status === 400) {
                    setError("password", {
                        type: "manual",
                        message: "Student code or password is not correct.",
                    });
                }
                dispatch({ type: "LOGIN_FAIL" });
            }
        });
    }; },
};
var unloadedState = { authenticate: { email: "" }, isLoading: false, status: false };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
            console.log("fail");
            return {
                authenticate: { email: "" },
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
            };
        case 'FAIL_LOGOUT':
            return {
                authenticate: state.authenticate,
                status: state.status,
                isLoading: false,
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Authentication.js.map