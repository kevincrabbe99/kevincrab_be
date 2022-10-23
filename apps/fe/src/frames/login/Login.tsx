import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Window from '../../components/window/Window'
import { WindowConfig } from '../../reducers/windowReducer';
import "./login.scss"

import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ScopesEnum } from '../../reducers/scopeReducer';
import { frameDispatcher } from '../../dispatchers/frameDispatcher';
import { FrameStatesEnum } from '../../reducers/frameReducer';

const loginWindowWidth: number = (document.documentElement.clientWidth > 400) ? 400 : document.documentElement.clientWidth - 20
const loginWindowX: number = (document.documentElement.clientWidth - loginWindowWidth) / 2

const loginWindow: WindowConfig = {
    "type": 0,
    "position": {
        "x": loginWindowX,
        "y": ((document.documentElement.clientHeight / 2)-75),
    },
    "size": {
        "width": loginWindowWidth,
        "height": 160
    },
    "title": "Welcome to my Website!",
    "helpData": "This is the login window. You can login here.",
    "minimizable": false,
    "showXButton": false
};



export default function Login() {

    const dispatch = useDispatch()
    const scopeState = useSelector((state: any) => state.scopes)

    // listen for document.documentElement.clientWidth changes
    const [windowHeight, setWindowHeight] = useState(document.documentElement.clientHeight)
    const [nudgerStyle, setNudgerStyle] = useState<CSSProperties>({top: 0})
    const initialWindowHeight = useRef(document.documentElement.clientHeight)

    // run once
    // jump to page depending on scope
    useEffect(() => {
        if (!scopeState) { return;}
        switch(scopeState.scopes[0]) {
            case ScopesEnum.RESUME:
                frameDispatcher.setState(dispatch, FrameStatesEnum.DESKTOP)
                break;
            case ScopesEnum.PERSONAL_WEBSITE:
                frameDispatcher.setState(dispatch, FrameStatesEnum.DESKTOP)
                break;
            default: break;
        }
    }, [])
    
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(document.documentElement.clientHeight)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    // used to nudge window height when keyboard is open
    useEffect(() => {
        // calculate difference
        let difference = windowHeight - initialWindowHeight.current

        // select child class of nudgerStyle .window-wrapper
        let windowWrappers = document.querySelectorAll(".window-wrapper")
        // loop through windowWrappers
        for (let i = 0; i < windowWrappers.length; i++) {
            // set windowWrappers[i].style.top to difference on type element
            (windowWrappers[i] as HTMLElement).style.marginTop = (difference / 2) + "px"
        }


    }, [windowHeight])

    return (
        <div className="login-wrapper">
            <div className="login-background-wrapper">
                <img src="./images/clouds.jpeg"></img>
            </div>
            <div className="login-page-content">

                <Window windowConfig={loginWindow} />
            </div>
        </div>
    )
}
