"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
var axios_1 = require("axios");
exports.actionCreators = {
    requestOrders: function () { return function (dispatch, getState) {
        axios_1.default.get("api/orders")
            .then(function (response) {
            if (response.status === 200) {
                dispatch({ type: 'RECEIVE_ORDERS', orders: response.data });
            }
        })
            .catch(function (ex) {
            console.log(ex);
            dispatch({ type: 'RECEIVE_ORDERS', orders: [] });
        });
        dispatch({ type: 'REQUEST_ORDERS' });
    }; },
    requestOrdersOfUser: function (userId) { return function (dispatch, getState) {
        axios_1.default.get("api/orders/users/" + userId)
            .then(function (response) {
            if (response.status === 200) {
                dispatch({ type: 'RECEIVE_ORDERS', orders: response.data });
            }
        });
        dispatch({ type: 'REQUEST_ORDERS' });
    }; }
};
var unloadedState = { orders: [], isLoading: false };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_ORDERS':
            return {
                orders: state.orders,
                isLoading: true
            };
        case 'RECEIVE_ORDERS':
            return {
                orders: action.orders,
                isLoading: false
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Orders.js.map