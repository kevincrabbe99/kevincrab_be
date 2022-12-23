import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FrameState, FrameStatesEnum } from '../../reducers/frameReducer';
import Desktop from '../desktop/Desktop'
import Login from '../login/Login';
import Shutdown from '../shutdown/Shutdown';
import MobileWindowCordinator from '../windowCordinator/mobile/MobileWindowCordinator';
import WindowCordinator from '../windowCordinator/WindowCordinator';

import {isMobile} from 'react-device-detect';

export default function FrameRouter() {

    // get frame from redux store
    const frame: FrameState = useSelector((state: any) => state.frame);

    return (
        <>

        {/* Window View */}
        {
            frame.state == FrameStatesEnum.DESKTOP ? 
              (isMobile ? <MobileWindowCordinator /> : <WindowCordinator /> )
            : null
        }

        {/* LOGIN Page */}
        { 
            frame.state == FrameStatesEnum.LOGIN ? <Login /> : null
        }
        {/* Desktop View */}
        {
            frame.state == FrameStatesEnum.DESKTOP ? <Desktop /> : null
        }
        {/* SHUTDOWN View */}
        {
            frame.state == FrameStatesEnum.SHUTDOWN ? <Shutdown /> : null
        }

        </>
    )
}