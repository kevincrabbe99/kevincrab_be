import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Window from '../../components/window/Window';
import DocumentWindow from '../../components/windowPages/document/DocumentWindow'
import { WindowConfig, WindowState } from '../../reducers/windowReducer';
import "./windowCordinator.scss"

const documentWindowConfig: WindowConfig = {
    "type": 2,
    "position": {
        "x": 200,
        "y": 50,
    },
    "size": {
        "width": 450,
        "height": 600
    },
    "title": "Resume - Kevin Crabbe.pdf",
    "showXButton": true,
    "icon": "WordPad_document.ico"
};

export default function WindowCordinator() {

    const dispatch = useDispatch()

    const windowState: WindowState = useSelector((state: any) => state.windows);

    return (
        <div className="windowCordinator-wrapper">
            {
                windowState.windows.map((windowConfig: WindowConfig) => {
                    if (windowConfig.type === 2) {
                        return (
                            <Window windowConfig={windowConfig} /> 
                        )
                    }
                })
            }
            
        </div>
    )
}
