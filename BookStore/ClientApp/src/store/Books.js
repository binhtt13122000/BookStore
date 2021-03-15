"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestBooks: function () { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        fetch("api/Books")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_BOOK', books: data });
        });
        dispatch({ type: 'REQUEST_BOOK' });
    }; }
};
var unloadedState = { books: [], isLoading: false };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_BOOK':
            return {
                books: state.books,
                isLoading: true
            };
        case 'RECEIVE_BOOK':
            return {
                books: action.books,
                isLoading: false
            };
    }
    return state;
};
exports.reducer = reducer;
//# sourceMappingURL=Books.js.map