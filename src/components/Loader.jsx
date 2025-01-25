import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='fixed top-0 left-0 flex justify-center items-center h-screen w-screen'>
            <RotatingLines
                visible={true}
                height="100"
                width="100"
                color="gray"
                strokeWidth="2"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;