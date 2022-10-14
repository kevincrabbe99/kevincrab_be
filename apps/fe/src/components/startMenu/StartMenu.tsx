import React from 'react'
import { StartMenuItem } from '../../types/StartMenuItem'
import "./startMenu.scss"

import startMenuJson from '../../assets/json/start_menu.json'

export default function StartMenu() {
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
                        startMenuJson.map((item: StartMenuItem) => 
                            renderStartMenuItem(item)
                        )
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

const renderStartMenuItem = (item: StartMenuItem) => {
    return (
        <li>
            <div className="startMenu-list-item">
                <div className="startMenu-list-item-icon">
                    <img src={`./icons/${item.icon}`} />
                </div>
                <div className="startMenu-list-item-label">
                    <label>{item.name}</label>
                </div>
                <div className="startMenu-list-item-arrow">
                    <label className="right-tick">&#9658;</label>
                </div>
            </div>
        </li>
    )
}
