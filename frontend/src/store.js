import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import data from "./data";

const initialstate = {};
const reducer = (state, action) => {
    return { products: data.products }
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialstate, composeEnhancer(applyMiddleware(thunk)));

export default store;  