"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
var axios_1 = require("axios");
exports.actionCreators = {
    deleteCart: function (id, resolve) { return function (dispatch, getState) {
        axios_1.default.delete("/api/productcarts/" + id)
            .then(function (request) {
            if (request.status === 204) {
                dispatch({ type: 'DELETE_ITEM_IN_CART', id: id });
            }
            resolve();
        }).
            catch(function (ex) {
            console.log(ex);
            resolve();
        });
    }; },
    updateCart: function (newData, id, index, quantity, resolve) { return function (dispatch, getSetter) {
        axios_1.default.put("/api/productcarts/" + id, __assign({}, newData))
            .then(function (request) {
            console.log(request);
            if (request.status === 204) {
                dispatch({ type: 'UPDATE_ITEM_IN_CART', id: index, quantity: quantity });
            }
            resolve();
        }).
            catch(function (ex) {
            console.log(ex);
            resolve();
        });
    }; },
    requestCart: function (id) { return function (dispath, getState) {
        axios_1.default.get("api/productcarts/users/" + id)
            .then(function (response) {
            if (response.status === 200) {
                dispath({ type: "RECEIVE_CART", cartDetails: response.data });
            }
        })
            .catch(function (ex) { return console.log(ex); });
        dispath({ type: 'REQUEST_CART' });
    }; },
    addToCart: function (cartDetail) { return function (dispatch, getState) {
        axios_1.default.post("api/productcarts/users/" + cartDetail.userId + "/books/" + cartDetail.bookId + "?quantity=1")
            .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                dispatch({ type: "ADD_TO_CART_SUCCESS", cartDetail: response.data });
            }
        })
            .catch(function (ex) {
            console.log(ex.response);
            dispatch({ type: "ADD_TO_CART_FAIL" });
        });
        dispatch({ type: "ADD_TO_CART_REQUEST" });
    }; }
};
var unloadedState = { isLoading: false, cartDetails: [] };
var reducer = function (state, incomingAction) {
    if (state === undefined)
        return unloadedState;
    var action = incomingAction;
    switch (action.type) {
        case "REQUEST_CART":
            return {
                isLoading: false,
                cartDetails: state.cartDetails
            };
        case "RECEIVE_CART":
            return {
                isLoading: false,
                cartDetails: action.cartDetails
            };
        case "ADD_TO_CART_REQUEST":
            return {
                isLoading: true,
                cartDetails: state.cartDetails
            };
        case "ADD_TO_CART_SUCCESS":
            var cartDetails = __spreadArrays(state.cartDetails);
            return {
                isLoading: false,
                cartDetails: cartDetails
            };
        case "ADD_TO_CART_FAIL":
            return {
                isLoading: false,
                cartDetails: state.cartDetails
            };
        case "REMOVE_FORM_CART":
            var removedCartDetails = __spreadArrays(state.cartDetails).filter(function (cartDetail) { return cartDetail.id !== action.id; });
            return {
                isLoading: false,
                cartDetails: removedCartDetails
            };
        case "UPDATE_ITEM_IN_CART":
            var updatedCartDetails = __spreadArrays(state.cartDetails);
            updatedCartDetails[action.id].quantity = action.quantity;
            return {
                isLoading: false,
                cartDetails: updatedCartDetails
            };
        case "DELETE_ITEM_IN_CART":
            var deletedCartDetails = __spreadArrays(state.cartDetails).filter(function (item) { return item.id !== action.id; });
            return {
                isLoading: false,
                cartDetails: deletedCartDetails
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Cart.js.map