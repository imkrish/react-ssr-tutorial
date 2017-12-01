import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'
import { Helmet } from 'react-helmet'

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers()
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>
        })
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Users App</title>
                    <meta property="og:title" content="Users App" />
                </Helmet>
                Here'is a big list of users:
                <ul>{ this.renderUsers() }</ul>
            </div>
        )
    }
}

const mapStateToProps = ({users}) => ({
    users
})

const loadData = (store) => {
    return store.dispatch(fetchUsers())
}

export default {
    component: connect(mapStateToProps, { fetchUsers })(UsersList),
    loadData
}