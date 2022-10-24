import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import IconGrid from '../../components/iconGrid/IconGrid'
import StartMenu from '../../components/startMenu/StartMenu'
import VolumeSlider from '../../components/taskbar/components/volumeSlider/VolumeSlider'
import Taskbar from '../../components/taskbar/Taskbar'
import { windowDispatcher } from '../../dispatchers/windowDispatcher'
import { ScopesEnum } from '../../reducers/scopeReducer'
import { WindowTypesEnum } from '../../reducers/windowReducer'
import "./desktop.scss"

export default function Desktop() {

  const dispatch = useDispatch()
  const scopesState = useSelector((state: any) => state.scopes)

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

  // run once at mount
  // is scopeState.scopes[0] === ScopesEnum.RESUME, then open resume
  var runCounter = 0;
  useEffect(() => {

    // prevent from running twice
    if (runCounter > 0) { return; }

    if (scopesState.scopes[0] === ScopesEnum.RESUME) {
      windowDispatcher.openWindow(dispatch, WindowTypesEnum.DOCUMENT, "./documents/Kevin_Crabbe_Resume.pdf#toolbar=0")
    }

    runCounter++;
  }, [])

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
