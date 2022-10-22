import React, { useState } from 'react'
import IconGrid from '../../components/iconGrid/IconGrid'
import StartMenu from '../../components/startMenu/StartMenu'
import VolumeSlider from '../../components/taskbar/components/volumeSlider/VolumeSlider'
import Taskbar from '../../components/taskbar/Taskbar'
import "./desktop.scss"

export default function Desktop() {

  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false)
  const [isVolumeSliderOpen, setIsVolumeSliderOpen] = useState<boolean>(false)

  const toggleStartMenu = () => {
      setIsStartMenuOpen(!isStartMenuOpen)
  }

  const toggleVolumeSlider = () => {
      setIsVolumeSliderOpen(!isVolumeSliderOpen)
  }

  const exitStartMenuEvent = () => {
    setIsStartMenuOpen(false)
    setIsVolumeSliderOpen(false)
  }

  return (
    <div className="desktop-wrapper">
        <div className="desktop-content-wrapper">
            

          <Taskbar toggleStartMenu={toggleStartMenu} toggleVolumeSlider={toggleVolumeSlider} />
          <div className="exitStartMenu_listener" onClick={() => exitStartMenuEvent()}> </div>
          <div className="iconGrid" onClick={() => exitStartMenuEvent()}>
            <IconGrid  />
          </div>
          <div className="startMenu">
          {
              isStartMenuOpen ? <StartMenu setIsStartMenuOpen={setIsStartMenuOpen} /> : null
          }
          </div>
          {
              isVolumeSliderOpen ? <VolumeSlider toggleVolumeSlider={toggleVolumeSlider} /> : null
          }

        </div>
    </div>
  )
}
