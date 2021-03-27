import axios from 'axios';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface OrderState {
    isLoading: boolean;
    orders: Order[];
}
export interface Order {
    id: number;
    userId: number;
    phoneNumber: string;
    address: string;
    createTime: string,
    total: number
}

export interface RequestOrdersAction {
    type: "REQUEST_ORDERS";
}

export interface ReceiveOrdersAction {
    type: "RECEIVE_ORDERS";
    orders: Order[];
}

type KnownAction = RequestOrdersAction | ReceiveOrdersAction;

export const actionCreators = {
    requestOrders: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.get(`api/orders`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: 'RECEIVE_ORDERS', orders: response.data });
                }
            })
            .catch(ex => {
                console.log(ex);
                dispatch({ type: 'RECEIVE_ORDERS', orders: [] });
            });

        dispatch({ type: 'REQUEST_ORDERS' });
    },

    requestOrdersOfUser: (userId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.get(`api/orders/users/${userId}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: 'RECEIVE_ORDERS', orders: response.data });
                }
            });
        dispatch({ type: 'REQUEST_ORDERS' });

    }
}

const unloadedState: OrderState = { orders: [], isLoading: false };

export const reducer: Reducer<OrderState> = (state: OrderState | undefined, incomingAction: Action): OrderState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ORDERS':
            return {
                orders: state.orders,
                isLoading: true
            };
        case 'RECEIVE_ORDERS':
            return {
                orders: action.orders,
                isLoading: false
            };
        default:
            return state;
    }
};




