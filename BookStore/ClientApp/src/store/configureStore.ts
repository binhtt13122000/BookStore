import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, reducers } from './';

export default function configureStore(history: History, initialState?: ApplicationState) {
    

    try {
        console.log("a");
        initialState = localStorage.getItem("master_class") ? JSON.parse(localStorage.getItem("master_class") || '{}') : {};
    } catch (error) {
        console.log('getError', error)
    }

    const saver = (store: any) => (next: any) => (action: any) => {
        console.log("b");
        console.log(store.getState());
        const returnValue = next(action);
        let stateToSave = store.getState();
        localStorage.setItem("master_class", JSON.stringify({ ...stateToSave }))
        return returnValue;
    }

    const middleware = [
        thunk,
        routerMiddleware(history),
    ];

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware, saver), ...enhancers)
    );
}
