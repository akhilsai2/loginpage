import React from 'react'
import Navbar from "./Nav"
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout