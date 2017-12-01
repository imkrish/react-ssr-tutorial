import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './components/Header'
import { fetchCurrentUser } from './actions'

const App = (prop) => {
    return (
        <div>
            <Header />
            {renderRoutes(prop.route.routes)}
        </div>
    )
}

const loadData = ({ dispatch }) => {
    return dispatch(fetchCurrentUser())
}

export default {
    component: App,
    loadData
}