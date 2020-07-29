import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ setAlert, searchUser, clearUsers, showClear }) => {

    const [text, setText] = useState('')

    const onChange = e => setText( e.target.value );

    const onSubmit = e => {
        e.preventDefault();
        if(text === '') {
            setAlert('please enter search param', 'light')
        } else {
            searchUser(text)
            setText('')
        }
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="Search User..." value={text} onChange={onChange}/>
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>

            {showClear &&
                <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            }
        </div>
    )
    
}

Search.propTyes = {
    searchUser: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search
