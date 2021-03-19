import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface CartState {
    isLoading: boolean;
    cartDetails: CartDetail[];
}

export interface CartDetail {
    id: number;
    userId: number;
    bookId: number;
    quantity: number;
    status: boolean;
}

export interface RequestCartAction {
    type: "REQUEST_CART";
}

export interface ReceiveCartAction {
    type: "RECEIVE_CART";
    cartDetails: CartDetail[]
}

export interface AddToCart {
    type: "ADD_TO_CART";
    cartDetail: CartDetail;
}

export interface RemoveFromCart {
    type: "REMOVE_FORM_CART";
    id: number;
}

export interface UpdateCart {
    type: "UPDATE_ITEM_IN_CART";
    cartDetail: CartDetail;
}

type KnownAction = ReceiveCartAction | RequestCartAction | AddToCart | RemoveFromCart | UpdateCart;

export const actionCreators = {
    requestCart: (id: number): AppThunkAction<KnownAction> => (dispath, getState) => {

    }


}

const unloadedState: CartState = { isLoading: false, cartDetails: [] };

export const reducer: Reducer<CartState> = (state: CartState | undefined, incomingAction: Action): CartState => {
    if (state === undefined) return unloadedState;
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case "REQUEST_CART":
            return {
                isLoading: false,
                cartDetails: state.cartDetails
            }
        case "RECEIVE_CART": 
            return {
                isLoading: false,
                cartDetails: action.cartDetails
            }
        case "ADD_TO_CART":
            let cartDetails = [...state.cartDetails];
            cartDetails.push(action.cartDetail);
            return {
                isLoading: false,
                cartDetails: cartDetails
            };
        case "REMOVE_FORM_CART":
            let removedCartDetails = [...state.cartDetails].filter(cartDetail => cartDetail.id !== action.id);
            return {
                isLoading: false,
                cartDetails: removedCartDetails
            };
        case "UPDATE_ITEM_IN_CART":
            let updatedCartDetails = [...state.cartDetails];
            let index = 1;
            updatedCartDetails[index] = action.cartDetail;
            return {
                isLoading: false,
                cartDetails: updatedCartDetails
            }
        default:
            return state;
    }
}
