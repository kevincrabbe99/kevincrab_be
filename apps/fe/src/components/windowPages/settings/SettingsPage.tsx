import React from 'react'
import { WindowConfig } from '../../../reducers/windowReducer';
import "./settings.scss"

export const settingsWindowConfig: WindowConfig = {
    "type": 5,
    "position": {
        "x": document.documentElement.clientWidth / 2 - 200,
        "y": document.documentElement.clientHeight / 2 - 100
    },
    "size": {
        "width": 400,
        "height": 175
    },
    "title": "Run",
    "showXButton": true,
    "icon": "Run.ico"
  };

export default function SettingsPage(props: any) {

  const windowConfig = props.windowConfig;

  return (
    <div>Settings</div>
  )
}
