import React from 'react'
import PropTypes from 'prop-types';


const UserItem = ( { repo: {forks, html_url, name, stargazers_count} } ) => {

    return (
        <div className="card text-center">
            <i className="fas fa-star" style={{color: "yellow"}}></i>: {stargazers_count}
            <p>Forks: {forks}</p>
            <a href={html_url}>{name}</a>
        </div>
    )
}

UserItem.propTypes = {
    repo: PropTypes.object.isRequired
}

export default UserItem