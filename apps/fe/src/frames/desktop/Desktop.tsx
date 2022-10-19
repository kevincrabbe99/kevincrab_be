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

  const exitStartMenuEvent = () => {
    setIsStartMenuOpen(false)
  }

  return (
    <div className="desktop-wrapper">
        <div className="desktop-content-wrapper">
            
          <div className="exitStartMenu_listener" onClick={() => exitStartMenuEvent()}> </div>
          <div className="iconGrid" onClick={() => exitStartMenuEvent()}>
            <IconGrid  />
          </div>
          <div className="startMenu">
          {
              isStartMenuOpen ? <StartMenu setIsStartMenuOpen={setIsStartMenuOpen} /> : null
          }
          </div>
          <Taskbar toggleStartMenu={toggleStartMenu} />
            

        </div>
    </div>
  )
}
