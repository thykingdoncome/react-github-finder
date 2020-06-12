import React, { Component } from 'react'

class UserItem extends Component {


    render() {
        const { login, avatar, html_url } = this.props.user;
        return (
            <div className="card text-center">
                <img src={avatar} alt={login}
                className="round-img" style={{width: '60px'}}
                />
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm my-1">more</a>
                </div>
            </div>
        )
    }
}
export default UserItem
