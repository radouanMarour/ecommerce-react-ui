import React from 'react'
import PreLogin from './PreLogin';
import PostLogin from './PostLogin';
import { useSelector } from 'react-redux'

const UserMenu = () => {
    const { loggedIn } = useSelector(state => state.auth)

    return (
        <>
            {loggedIn ? <PostLogin /> : <PreLogin />}
        </>

    )
}

export default UserMenu