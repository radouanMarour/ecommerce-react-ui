import React, { useEffect } from 'react'
import PreLogin from './PreLogin';
import PostLogin from './PostLogin';
import { useSelector } from 'react-redux'

const UserMenu = () => {
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            console.log('User is authenticated');
        } else {
            console.log('User is not authenticated');
        }
    }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated ? <PostLogin /> : <PreLogin />}
        </>

    )
}

export default UserMenu