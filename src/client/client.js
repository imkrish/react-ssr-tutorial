// Startup point for the client side application
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Routes from './Routes'
import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducers'

const axiosInstance = axios.create({
    baseURL: '/api'
})

const store = createStore(
    reducers,
    window.INITIAL_STATE, // init state
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
)

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{ renderRoutes(Routes) }</div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)