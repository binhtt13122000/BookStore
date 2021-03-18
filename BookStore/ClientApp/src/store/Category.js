"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestCategories: function () { return function (dispatch, getState) {
        fetch("api/Categories")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_CATEGORY', category: data });
        });
        dispatch({ type: 'REQUEST_CATEGORY' });
    }; },
};
var unloadedState = { categories: [], isLoading: false };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_CATEGORY':
            return {
                categories: state.categories,
                isLoading: true
            };
        case 'RECEIVE_CATEGORY':
            return {
                categories: action.category,
                isLoading: false
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Category.js.map