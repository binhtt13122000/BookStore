import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface CategoryState {
    isLoading: boolean;
    categories: Category[];
}

export interface Category {
    id: number;
    name: string;
}


export interface RequestCategoryAction {
    type: "REQUEST_CATEGORY";
}

export interface ReceiveCategoryAction {
    type: "RECEIVE_CATEGORY";
    category: Category[];
}



type KnownAction = RequestCategoryAction | ReceiveCategoryAction;

export const actionCreators = {
    requestCategories: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/Categories`)
            .then(response => response.json() as Promise<Category[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_CATEGORY', category: data });
            });

        dispatch({ type: 'REQUEST_CATEGORY' });
    },
};

const unloadedState: CategoryState = { categories: [], isLoading: false };

export const reducer: Reducer<CategoryState> = (state: CategoryState | undefined, incomingAction: Action): CategoryState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
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





