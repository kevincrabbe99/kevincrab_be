import React from 'react'
import './OS.css'

import Taskbar from './taskbar/Taskbar'
import Desktop from './desktop/Desktop'

const OS = () => {
    return (
        <div className = "OS_bg">
            
            <Desktop />

            <Taskbar />

        </div>
    )
}

export default OS
