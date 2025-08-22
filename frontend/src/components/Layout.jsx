import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const Layout = () => {
    return (
        <div className='flex bg-background'>
            <Navigation />
            <main className='flex-1 overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout