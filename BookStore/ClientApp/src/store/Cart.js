"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestCart: function (id) { return function (dispath, getState) {
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
        case "ADD_TO_CART":
            var cartDetails = __spreadArrays(state.cartDetails);
            cartDetails.push(action.cartDetail);
            return {
                isLoading: false,
                cartDetails: cartDetails
            };
        case "REMOVE_FORM_CART":
            var removedCartDetails = __spreadArrays(state.cartDetails).filter(function (cartDetail) { return cartDetail.id !== action.id; });
            return {
                isLoading: false,
                cartDetails: removedCartDetails
            };
        case "UPDATE_ITEM_IN_CART":
            var updatedCartDetails = __spreadArrays(state.cartDetails);
            var index = 1;
            updatedCartDetails[index] = action.cartDetail;
            return {
                isLoading: false,
                cartDetails: updatedCartDetails
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Cart.js.map