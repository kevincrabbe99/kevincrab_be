import React, { useEffect, useState } from 'react'
import { StartMenuActionType, StartMenuItem } from '../../types/StartMenuItem'
import "./startMenu.scss"

import startMenuJson from '../../assets/json/start_menu.json'
import { DestinationActionTriggers } from '../../types/DestinationActionTriggers'
import { useDispatch } from 'react-redux'
import { FrameStatesEnum } from '../../reducers/frameReducer'
import { fromEvent, map } from 'rxjs'
import { browserWindowConfig } from '../windowPages/browser/BrowserPage'
import { folderWindowConfig } from '../windowPages/folder/FolderPage'



export default function StartMenu(props: any) {

  const setIsStartMenuOpen = props.setIsStartMenuOpen

  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null)


  const dispatch = useDispatch();

  const handleDestinationAction = (action: StartMenuActionType) => {
      switch(action.destination) {
            case DestinationActionTriggers.SHUTDOWN:
                console.log("shutdown")
                dispatch({type: "SET_STATE", payload: FrameStatesEnum.SHUTDOWN});
                break;
            case DestinationActionTriggers.OPEN_BROWSER:
                console.log("open browser")
                browserWindowConfig.contentData = action.param;
                dispatch({type: "ADD_WINDOW", payload: browserWindowConfig});
                break;
            case DestinationActionTriggers.OPEN_FOLDER:
                console.log("open folder")
                folderWindowConfig.contentData = action.param;
                dispatch({type: "ADD_WINDOW", payload: folderWindowConfig});
                break;
            default:
                break;
      }

      setIsStartMenuOpen(false)
  }

  return (
    <div className="startMenu-wrapper">
        <div className="startMenu-left-box">
            <label className="rotetedWindowsText">
                <span className="rwt-windows">ReactHooks</span>
                <span className="rwt-95">95</span>
            </label>
        </div>
        <div className="startMenu-right-box">
            <div className="startMenu-list">
                <ul>
                    {
                        startMenuJson.map((item: StartMenuItem, index: number) => 
                            // if last item in list
                            index === startMenuJson.length - 1 ?
                            <>
                                <li className="last-item"> 
                                </li>
                                {renderStartMenuItemActionWrapper(item, setSelectedSubmenu, handleDestinationAction, selectedSubmenu)}
                            </>
                            : 
                            renderStartMenuItemActionWrapper(item, setSelectedSubmenu, handleDestinationAction, selectedSubmenu)
                        )
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

const renderStartMenuItem = (item: StartMenuItem, setSelectedSubmenu: React.Dispatch<React.SetStateAction<string | null>>, selectedSubmenu?: string | null) => {
    return (
        <>
            <div className="startMenu-list-item-icon">
                <img src={`./icons/${item.icon}`} />
            </div>
            <div className="startMenu-list-item-label">
                <label>{item.name}</label>
            </div>
            {
                item.submenu ? <>
                <div className="startMenu-list-item-arrow">
                    <label className="right-tick">&#9658;</label>
                </div>
                </> : null
            }
        </>
    )
}

const renderStartMenuItemActionWrapper = (item: StartMenuItem, setSelectedSubmenu: React.Dispatch<React.SetStateAction<string | null>>, handleDestinationAction: any, selectedSubmenu?: string | null) => {
    // is an internal action item
    if (item.action.isExternal === 0 && !item.submenu) {
        return (
            <li>
                <div className="startMenu-list-item" onClick={() => handleDestinationAction(item.action)}>
                    {renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)}
                </div>
                {
                    item.submenu &&
                    item.name == selectedSubmenu ? renderStartMenuSubmenu(item.submenu, setSelectedSubmenu = setSelectedSubmenu, handleDestinationAction) : null
                }
            </li>
        )
    // is an external link with no submenu
    } else if (!item.submenu && item.action.isExternal === 1) {
        return (
            <li>
                <a href = {item.action.destination as string}>
                    <div className="startMenu-list-item">
                        {renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)}
                    </div>
                </a>
                {
                    item.submenu &&
                    item.name == selectedSubmenu ? renderStartMenuSubmenu(item.submenu, setSelectedSubmenu = setSelectedSubmenu, handleDestinationAction) : null
                }
            </li>
        )
    // is an item with a submenu
    } else {
        return (
            <li>
                <div className="startMenu-list-item" onClick={() => setSelectedSubmenu((item.name == selectedSubmenu ? null : item.name ))}>
                    {renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)}
                </div>
                {
                    item.submenu &&
                    item.name == selectedSubmenu ? renderStartMenuSubmenu(item.submenu, setSelectedSubmenu = setSelectedSubmenu, handleDestinationAction) : null
                }
            </li>
        )
    }
}


const renderStartMenuSubmenu = (submenu: StartMenuItem[], setSelectedSubmenu: React.Dispatch<React.SetStateAction<string | null>>, handleDestinationAction: any) => {
    return (
        <div className="startMenu-list-item-submenu">
            <ul>
                {
                    submenu.map((item: StartMenuItem) => 
                       renderStartMenuItemActionWrapper(item, setSelectedSubmenu = setSelectedSubmenu, handleDestinationAction)
                    )
                }
            </ul>
        </div>
    )
}
