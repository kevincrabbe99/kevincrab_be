import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { frameDispatcher } from './dispatchers/frameDispatcher'
import { scopeDispatcher } from './dispatchers/scopeDispatcher'
import { ScopesEnum } from './reducers/scopeReducer'
import { cookieManager } from './util/cookieManager'
import { mapScopeToLandingPage } from './util/mappers/mapScopeToLandingPage'
import { mapSubdomainToScope } from './util/mappers/mapSubdomainToScope'
import CrtFilter from './frames/crtFilter/CrtFilter'

export default function ScopeProxy() {


    const dispatch = useDispatch()
    const scopeState = useSelector((state: any) => state.scopes)
    const frameState = useSelector((state: any) => state.frame)

    // Check the url and set personalization accordingly
    // Run once on mount
    useEffect(() => {
        // get the subdomain from the url
        const subdomain = window.location.hostname.split('.')[0]
        
        // update scope given the subdomain
        const scope: ScopesEnum[] = [mapSubdomainToScope(subdomain)] 
        scopeDispatcher.setScopes(dispatch, scope)

        // if cookie 'FRAME_STATE' exists, dont jump to frame
        if (cookieManager.getCookieFromKey('FRAME_STATE')) { return; }
        
        // returns the FrameStatesEnum that corresponds to the scope
        const jumpToFrame = mapScopeToLandingPage(scopeState.scopes[0])
        if (frameState.state == jumpToFrame) { return; }

        frameDispatcher.setState(dispatch, jumpToFrame)

    }, [])

    return ( 
        <>
            <CrtFilter />
        </>
    )
}
