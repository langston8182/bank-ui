import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: "us-east-1",
        userPoolId: "us-east-1_QB7RXakvf",
        userPoolWebClientId: "7b2ln0fib611qpfv98rim9skml"
    }
});

const invariant = require("redux-immutable-state-invariant").default();

const createStoreWithMiddleware = applyMiddleware(invariant, thunk)(createStore);

const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));