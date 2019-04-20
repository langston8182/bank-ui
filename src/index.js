import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import {getConnectedUser, setAuthentication} from "./actions";

const invariant = require("redux-immutable-state-invariant").default();

const createStoreWithMiddleware = applyMiddleware(invariant, thunk)(createStore);

const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem("token");
if (token) {
    store.dispatch(setAuthentication(true));
    store.dispatch(getConnectedUser());
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));