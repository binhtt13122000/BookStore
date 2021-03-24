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
var es6_promise_1 = require("es6-promise");
exports.actionCreators = {
    requestBooks: function () { return function (dispatch, getState) {
        axios_1.default.get("api/Books")
            .then(function (response) {
            if (response.status === 200) {
                dispatch({ type: 'RECEIVE_BOOK', books: response.data });
            }
        });
        dispatch({ type: 'REQUEST_BOOK' });
    }; },
    requestBook: function (id) { return function (dispatch, getState) {
        axios_1.default.get("api/Books/" + id)
            .then(function (response) {
            if (response.status === 200) {
                dispatch({ type: 'RECEIVE_BOOK', books: [response.data] });
            }
        });
        dispatch({ type: 'REQUEST_BOOK' });
    }; },
    requestBookByCategory: function (arrayOfIndex) { return function (dispatch, getState) {
        if (arrayOfIndex.length === 1 && arrayOfIndex[0] === 0) {
            axios_1.default.get("api/Books")
                .then(function (response) {
                if (response.status === 200) {
                    dispatch({ type: 'RECEIVE_BOOK', books: response.data });
                }
            });
            dispatch({ type: 'REQUEST_BOOK' });
        }
        else {
            var promise = arrayOfIndex.filter(function (item) { return item !== 0; }).map(function (item) {
                console.log(item);
                return axios_1.default.get("api/categories/" + item + "/books").then(function (response) {
                    if (response.status === 200) {
                        return __spreadArrays(response.data);
                    }
                });
            });
            es6_promise_1.Promise.all(promise)
                .then(function (result) {
                var books = result.flat();
                console.log(books);
                dispatch({ type: 'RECEIVE_BOOK', books: books });
            })
                .catch(function (e) { return console.log(e); });
            dispatch({ type: 'REQUEST_BOOK' });
        }
    }; },
    createBooks: function (book, resolve) { return function (dispatch, getState) {
        axios_1.default.post("api/Books", __assign({}, book))
            .then(function (response) {
            if (response.status === 200) {
                dispatch({ type: 'ADD_BOOK', newBook: response.data });
                resolve();
            }
        })
            .catch(function (err) {
            resolve();
            console.log(err);
        });
    }; },
    updateBooks: function (newBook, oldBook, resolve) { return function (dispatch, getState) {
        axios_1.default.put("api/Books/" + oldBook.id, __assign({}, newBook))
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