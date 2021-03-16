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
    requestBooks: function () { return function (dispatch, getState) {
        fetch("api/Books")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_BOOK', books: data });
        });
        dispatch({ type: 'REQUEST_BOOK' });
    }; },
    requestBook: function (id) { return function (dispatch, getState) {
        fetch("api/Books/" + id)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_BOOK', books: [data] });
        });
        dispatch({ type: 'REQUEST_BOOK' });
    }; },
    createBooks: function (book, resolve) { return function (dispatch, getState) {
        book.categoryId = 1;
        fetch("api/Books", {
            method: 'post',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'ADD_BOOK', newBook: data });
            resolve();
        })
            .catch(function (err) {
            resolve();
            console.log(err);
        });
    }; },
    updateBooks: function (newBook, oldBook, resolve) { return function (dispatch, getState) {
        newBook.categoryId = 1;
        fetch("api/Books/" + oldBook.id, {
            method: 'put',
            body: JSON.stringify(newBook),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
            if (response.status === 204) {
                dispatch({ type: "UPDATE_BOOK", updateBook: newBook, index: oldBook.tableData.id });
            }
            resolve();
        })
            .catch(function (err) {
            resolve();
            console.log(err);
        });
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
        case 'ADD_BOOK':
            var listBook = __spreadArrays(state.books);
            listBook.push(action.newBook);
            return {
                books: listBook,
                isLoading: false
            };
        case 'UPDATE_BOOK':
            var newBooks = __spreadArrays(state.books);
            newBooks[action.index] = action.updateBook;
            return {
                books: newBooks,
                isLoading: false
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Books.js.map