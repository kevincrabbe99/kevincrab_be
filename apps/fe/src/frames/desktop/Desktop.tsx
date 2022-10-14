import React, { useState } from 'react'
import IconGrid from '../../components/iconGrid/IconGrid'
import StartMenu from '../../components/startMenu/StartMenu'
import Taskbar from '../../components/taskbar/Taskbar'
import "./desktop.scss"

export default function Desktop() {

  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false)

  const toggleStartMenu = () => {
      setIsStartMenuOpen(!isStartMenuOpen)
  }

  return (
    <div className="desktop-wrapper">
        <div className="desktop-content-wrapper">
            
            <IconGrid />
            {
                isStartMenuOpen ? <StartMenu /> : null
            }
            <Taskbar toggleStartMenu={toggleStartMenu} />

        </div>
    </div>
  )
}
