import React from 'react'
import IconGrid from '../../components/iconGrid/IconGrid'
import StartMenu from '../../components/startMenu/StartMenu'
import Taskbar from '../../components/taskbar/Taskbar'
import "./desktop.scss"

export default function Desktop() {
  return (
    <div className="desktop-wrapper">
        <div className="desktop-content-wrapper">
            
            <IconGrid />
            <StartMenu />
            <Taskbar />

        </div>
    </div>
  )
}
