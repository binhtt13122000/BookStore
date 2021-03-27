import axios from 'axios';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface CartState {
    isLoading: boolean;
    cartDetails: CartDetail[];
}

export interface CartDetail {
    id?: number;
    userId: number;
    bookId: number;
    quantity: number;
    status?: boolean;
}

export interface RequestCartAction {
    type: "REQUEST_CART";
}

export interface ReceiveCartAction {
    type: "RECEIVE_CART";
    cartDetails: CartDetail[]
}

export interface AddToCartRequest {
    type: "ADD_TO_CART_REQUEST";
}

export interface AddToCartSuccess {
    type: "ADD_TO_CART_SUCCESS";
    cartDetail: CartDetail;
}

export interface AddToCartFail {
    type: "ADD_TO_CART_FAIL";
}

export interface RemoveFromCart {
    type: "REMOVE_FORM_CART";
    id: number;
}

export interface UpdateCart {
    type: "UPDATE_ITEM_IN_CART";
    id: number;
    quantity: number;
}

export interface DeleteCart {
    type: "DELETE_ITEM_IN_CART";
    id: number;
}

export interface DeleteCartAll {
    type: "DELETE_CART";
}
type KnownAction = ReceiveCartAction | RequestCartAction | AddToCartRequest | AddToCartSuccess | AddToCartFail | RemoveFromCart | UpdateCart | DeleteCart | DeleteCartAll;

export const actionCreators = {
    deleteCart: (id: number, resolve: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.delete(`/api/productcarts/${id}`)
            .then(request => {
                if (request.status === 204) {
                    dispatch({ type: 'DELETE_ITEM_IN_CART', id: id });
                }
                resolve();
            }).
            catch(ex => {
                console.log(ex);
                resolve();
            })
    },
    deleteAll: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "DELETE_CART" });
    },
    updateCart: (newData: CartDetail, id: number, index: number, quantity: number, resolve: any): AppThunkAction<KnownAction> => (dispatch, getSetter) => {
        axios.put(`/api/productcarts/${id}`, { ...newData })
            .then(request => {
                console.log(request)
                if (request.status === 204) {
                    dispatch({ type: 'UPDATE_ITEM_IN_CART', id: index, quantity: quantity });
                }
                resolve();
            }).
            catch(ex => {
                console.log(ex);
                resolve();
            })
    },
    requestCart: (id: number): AppThunkAction<KnownAction> => (dispath, getState) => {
        axios.get(`api/productcarts/users/${id}`)
            .then(response => {
                if (response.status === 200) {
                    dispath({ type: "RECEIVE_CART", cartDetails: response.data })
                }
            })
            .catch(ex => {
                console.log(ex);
                dispath({ type: "RECEIVE_CART", cartDetails: [] })
            });
        dispath({ type: 'REQUEST_CART' });
    },

    addToCart: (cartDetail: CartDetail, setMessage: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.post(`api/productcarts/users/${cartDetail.userId}/books/${cartDetail.bookId}?quantity=1`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    dispatch({ type: "ADD_TO_CART_SUCCESS", cartDetail: response.data });
                    console.log("m");
                    setMessage("Thêm vào giỏ hàng thành công!");
                }
            })
            .catch(ex => {
                console.log(ex.response);
                setMessage("Thêm vào giỏ hàng thất bại!")
                dispatch({ type: "ADD_TO_CART_FAIL" });
            })
        dispatch({ type: "ADD_TO_CART_REQUEST" });
    },
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
        case "ADD_TO_CART_REQUEST":
            return {
                isLoading: true,
                cartDetails: state.cartDetails
            }
        case "ADD_TO_CART_SUCCESS":
            let cartDetails = [...state.cartDetails];
            return {
                isLoading: false,
                cartDetails: cartDetails
            };
        case "ADD_TO_CART_FAIL":
            return {
                isLoading: false,
                cartDetails: state.cartDetails
            };
        case "REMOVE_FORM_CART":
            let removedCartDetails = [...state.cartDetails].filter(cartDetail => cartDetail.id !== action.id);
            return {
                isLoading: false,
                cartDetails: removedCartDetails
            };
        case "UPDATE_ITEM_IN_CART":
            let updatedCartDetails = [...state.cartDetails];
            updatedCartDetails[action.id].quantity = action.quantity;
            return {
                isLoading: false,
                cartDetails: updatedCartDetails
            }
        case "DELETE_ITEM_IN_CART":
            let deletedCartDetails = [...state.cartDetails].filter(item => item.id !== action.id);
            return {
                isLoading: false,
                cartDetails: deletedCartDetails
            }
        case "DELETE_CART": {
            return {
                isLoading: false,
                cartDetails: []
            }
        }
        default:
            return state;
    }
}
