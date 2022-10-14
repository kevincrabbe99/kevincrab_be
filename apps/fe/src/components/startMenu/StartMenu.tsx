import React, { useState } from 'react'
import { StartMenuItem } from '../../types/StartMenuItem'
import "./startMenu.scss"

import startMenuJson from '../../assets/json/start_menu.json'


export default function StartMenu() {

  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null)

  return (
    <div className="startMenu-wrapper">
        <div className="startMenu-left-box">
            <label className="rotetedWindowsText">
                <span className="rwt-windows">Windows</span>
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
                                {renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)}
                            </>
                            : 
                            renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)
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
        <li>
            <div className="startMenu-list-item" onClick={() => setSelectedSubmenu((item.name == selectedSubmenu ? null : item.name ))}>
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
                
            </div>
            {
                item.submenu &&
                item.name == selectedSubmenu ? renderStartMenuSubmenu(item.submenu, setSelectedSubmenu = setSelectedSubmenu) : null
            }
        </li>
    )
}


const renderStartMenuSubmenu = (submenu: StartMenuItem[], setSelectedSubmenu: React.Dispatch<React.SetStateAction<string | null>>) => {
    return (
        <div className="startMenu-list-item-submenu">
            <ul>
                {
                    submenu.map((item: StartMenuItem) => 
                        renderStartMenuItem(item, setSelectedSubmenu = setSelectedSubmenu)
                    )
                }
            </ul>
        </div>
    )
}