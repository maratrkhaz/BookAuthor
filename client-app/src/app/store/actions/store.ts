import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './../reducers/rootReducer';

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))

    //  compose(applyMiddleware(thunk)
    //  , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //  )
);