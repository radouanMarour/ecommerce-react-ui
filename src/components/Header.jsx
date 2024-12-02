import React, { useEffect, useState } from 'react'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            {width <= 768 ? <MobileHeader /> : <DesktopHeader />}
        </>
    )
}

export default Header