import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

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

type KnownAction = RequestBookAction | ReceiveBookAction | AddBookAction | UpdateBookAction;

export const actionCreators = {
    requestBooks: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/Books`)
            .then(response => response.json() as Promise<Book[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_BOOK', books: data });
            });

        dispatch({ type: 'REQUEST_BOOK' });
    },

    createBooks: (book: Book, resolve: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        book.categoryId = 1;
        fetch(`api/Books`, {
            method: 'post',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json() as Promise<Book>)
            .then(data => {
                dispatch({ type: 'ADD_BOOK', newBook: data });
                resolve();
            })
            .catch(err => {
                resolve();
                console.log(err)
            });

    },

    updateBooks: (newBook: Book, oldBook: any, resolve: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        newBook.categoryId = 1;
        fetch(`api/Books/${oldBook.id}`, {
            method: 'put',
            body: JSON.stringify(newBook),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 204) {
                    dispatch({ type: "UPDATE_BOOK", updateBook: newBook, index: oldBook.tableData.id })
                }
                resolve();
            })
            .catch(err => {
                resolve();
                console.log(err)
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





