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
    updateBook: Book
}

type KnownAction = RequestBookAction | ReceiveBookAction | AddBookAction | UpdateBookAction;

export const actionCreators = {
    requestBooks: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        fetch(`api/Books`)
            .then(response => response.json() as Promise<Book[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_BOOK', books: data });
            });

        dispatch({ type: 'REQUEST_BOOK' });
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
    }

    return state;
};





