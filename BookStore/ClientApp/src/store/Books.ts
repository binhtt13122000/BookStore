import { Book } from '@material-ui/icons';
import axios from 'axios';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { Promise } from 'es6-promise'

export interface BookState {
    isLoading: boolean;
    books: Book[];
}

export interface Book {
    id: string;
    name: string;
    author: string;
    price: number;
    quantity: number;
    status: boolean;
    categoryId: number;
    category?: any,
    image?: string
}


export interface RequestBookAction {
    type: "REQUEST_BOOK";
}

export interface ReceiveBookAction {
    type: "RECEIVE_BOOK";
    books: Book[];
}

export interface AddBookAction {
    type: "ADD_BOOK";
    newBook: Book;
}

export interface UpdateBookAction {
    type: "UPDATE_BOOK";
    updateBook: Book;
    index: number;
}

export interface RequestOneBook {
    type: "REQUEST_ONE_BOOK",
    book: Book
}

type KnownAction = RequestBookAction | ReceiveBookAction | AddBookAction | UpdateBookAction;

export const actionCreators = {
    requestBooks: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.get(`api/Books`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: 'RECEIVE_BOOK', books: response.data });
                }
            })
            .catch(ex => {
                console.log(ex);
                dispatch({ type: 'RECEIVE_BOOK', books: [] });
            })

        dispatch({ type: 'REQUEST_BOOK' });
    },

    requestBook: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.get(`api/Books/${id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: 'RECEIVE_BOOK', books: [response.data] });
                }
            });
        dispatch({ type: 'REQUEST_BOOK' });
    },

    requestBookByCategory: (arrayOfIndex: number[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (arrayOfIndex.length === 1 && arrayOfIndex[0] === 0) {
            axios.get(`api/Books`)
                .then(response => {
                    if (response.status === 200) {
                        dispatch({ type: 'RECEIVE_BOOK', books: response.data });
                    }
                });

            dispatch({ type: 'REQUEST_BOOK' });
        } else {
            const promise = arrayOfIndex.filter(item => item !== 0).map(item => {
                console.log(item);
                return axios.get(`api/categories/${item}/books`).then(response => {
                    if (response.status === 200) {
                        return [...response.data];
                    }
                });
            })
            Promise.all(promise)
                .then((result: any) => {
                    let books = result.flat();
                    console.log(books);
                    dispatch({ type: 'RECEIVE_BOOK', books: books });
                })
                .catch(e => console.log(e))
            dispatch({ type: 'REQUEST_BOOK' });
        }
    },

    createBooks: (book: Book, resolve: any, setMessage: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.post(`api/Books`, {...book})
            .then(response => {
                if (response.status === 201) {
                    dispatch({ type: 'ADD_BOOK', newBook: response.data });
                    setMessage("Thêm sản phẩm thành công!")
                    resolve();
                }
            })
            .catch(err => {
                resolve();
                setMessage("Thêm sản phẩm thất bại!")
                console.log(err)
            });

    },

    updateBooks: (newBook: Book, oldBook: any, resolve: any, setMessage?: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.put(`api/Books/${oldBook.id}`, { ...newBook })
            .then(response => {
                if (response.status === 204) {
                    dispatch({ type: "UPDATE_BOOK", updateBook: newBook, index: oldBook.tableData.id });
                    setMessage("Chỉnh sửa sản phẩm thành công!")
                }
                resolve();
            })
            .catch(err => {
                resolve();
                setMessage("Chỉnh sửa thất bại!");
                console.log(err.response)
            });

    }
};

const unloadedState: BookState = { books: [], isLoading: false };

export const reducer: Reducer<BookState> = (state: BookState | undefined, incomingAction: Action): BookState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
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
            let listBook = [...state.books];
            listBook.push(action.newBook);
            return {
                books: listBook,
                isLoading: false
            };
        case 'UPDATE_BOOK':
            let newBooks = [...state.books];
            newBooks[action.index] = action.updateBook;
            return {
                books: newBooks,
                isLoading: false
            };
        default:
            return state;
    }
};





