import { getAnalytics } from 'firebase/analytics';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { windowDispatcher } from '../../../dispatchers/windowDispatcher';
import { WindowConfig } from '../../../reducers/windowReducer';
import { ga4 } from '../../../util/ga4';

import "./fallbackPage.scss"

export const fallbackWindowConfig: WindowConfig = {
    "type": 9,
    "position": {
        "x": 200,
        "y": 150,
    },
    "size": {
        "width": 400,
        "height": 150
    },
    "title": "Access Denied",
    "showXButton": true,
    "icon": "Cross.ico",
    "minimizable": false,
    "maximizable": false,
  };

export default function FallbackPage(props: any) {

    const analytics = getAnalytics()

    const windowConfig = props.windowConfig
    const windowState: WindowConfig[] = useSelector((state: any) => state.windowState);
    const scopeState = useSelector((state: any) => state.scopeState);

    const dispatch = useDispatch()

    const okayEvent = () => {
        windowDispatcher.closeWindow(dispatch, windowConfig.id)
    }

    // run on mount to log an error in firebase
    useEffect(() => {
        ga4.logError(analytics, "FALLBACK_MODAL", { windowConfig: windowConfig, windowState: windowState, scopes: scopeState.scopes })
    }, [])  

    return (
        <div className="fallback-wrapper">
            <div className="fallback-top">
                <div className="fallback-icon">
                    <img src="./icons/Dark_Agent.ico" alt="Cross Icon" />
                </div>
                <div className="fallback-text">
                    <h1>Access Denied</h1>
                    <p>Sorry, you do not have permission to access this resourse.</p>
                </div>
            </div>
            <div className="fallback-buttons">
                <button className="fallback-button" onClick={() => okayEvent()}>OK</button>
            </div>
        </div>
    )
}
