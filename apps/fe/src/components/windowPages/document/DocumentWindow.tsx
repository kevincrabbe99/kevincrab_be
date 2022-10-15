import React from 'react'
import { WindowConfig } from '../../../reducers/windowReducer';
import Window from '../../window/Window';
import "./documentWindow.scss"


export const documentWindowConfig: WindowConfig = {
    "type": 2,
    "position": {
        "x": 200,
        "y": 150,
    },
    "size": {
        "width": 425,
        "height": 500
    },
    "title": "Resume - Kevin Crabbe.pdf",
    "showXButton": true,
    "icon": "WordPad_document.ico"
};

export default function DocumentWindow() { 
    return (
        <Window windowConfig={documentWindowConfig} />
    )
}
