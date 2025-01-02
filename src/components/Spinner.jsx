import React from 'react'
import { Oval } from 'react-loader-spinner'

const Spinner = () => {
    return (
        <Oval
            visible={true}
            height="25"
            width="25"
            color="#ffffff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default Spinner