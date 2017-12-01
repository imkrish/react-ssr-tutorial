import React from 'react'
import App from './App'
import HomePage from './pages/HomePage'
import UsersListPage from './pages/UsersListPage'
import AdminsListPage from './pages/AdminsListPage'
import NotFoundPage from './pages/NotFoundPage'


export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,
                exact: true,
                path: '/'
            },
            {
                ...UsersListPage,
                path: '/users',
            },
            {
                ...AdminsListPage,
                path: '/admins',
            },
            {
                ...NotFoundPage
            }
        ]
    }
]
