import React from 'react'
import './OS.css'

import Taskbar from './taskbar/Taskbar'
import Desktop from './desktop/Desktop'
import StartMenu from './start_menu/Start_menu'

const OS = () => {
    return (
        <div className = "OS_bg">
            
            
            <div className = "startMenu_container">
                <StartMenu />
            </div>
            <Taskbar />

        </div>
    )
}

export default OS
