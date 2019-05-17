import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import {getConnectedUser, setAuthentication} from "./actions";
import {Security} from "@okta/okta-react";

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

const oktaConfig = {
    issuer: `https://dev-847930.okta.com/oauth2/default`,
    redirect_uri: `https://bank-ui.herokuapp.com/implicit/callback`,
    client_id: "0oalksrvhklabos4i356"
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Security {...oktaConfig}>
                <App />
            </Security>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));