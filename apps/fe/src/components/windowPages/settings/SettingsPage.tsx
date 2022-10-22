import React from 'react'
import { WindowConfig } from '../../../reducers/windowReducer';
import "./settings.scss"
import DisplaySettingsPage from './subapps/display/DisplaySettingsPage';

export const settingsWindowConfig: WindowConfig = {
    "type": 5,
    "icon": "Customize_computer.ico",
    "position": {
        "x": document.documentElement.clientWidth / 2 - 200,
        "y": document.documentElement.clientHeight / 2 - 100
    },
    "size": {
        "width": 500,
        "height": 375
    },
    "title": "Control Panel",
    "showXButton": true,
    "minimizable": false
  };

export enum SettingsWindowTypesEnum {
    DISPLAY = "DISPLAY",
    PERSONALIZATION = "PERSONALIZATION",
}

export default function SettingsPage(props: any) {

  const windowConfig = props.windowConfig;
  const param = props.contentData;

  return (
    <div className="settings-wrapper">
      {
        param === SettingsWindowTypesEnum.DISPLAY ?
        <DisplaySettingsPage windowConfig={windowConfig} /> :
        param === SettingsWindowTypesEnum.PERSONALIZATION ?
        <div>Personalization</div> :
        <div>Unknown</div>
      }
    </div>
  )
}
