import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { frameDispatcher } from './dispatchers/frameDispatcher'
import { scopeDispatcher } from './dispatchers/scopeDispatcher'
import { ScopesEnum } from './reducers/scopeReducer'
import { cookieManager } from './util/cookieManager'
import { mapScopeToLandingPage } from './util/mappers/mapScopeToLandingPage'
import { mapSubdomainToScope } from './util/mappers/mapSubdomainToScope'
import CrtFilter from './frames/crtFilter/CrtFilter'

import { ga4 } from './util/ga4'
import { Analytics, getAnalytics } from 'firebase/analytics'

// Add scopes here that you want to be excluded from save frame.state on reload
const hardRedirectScoeps = [
    ScopesEnum.RESUME,
    ScopesEnum.LINKS,
    ScopesEnum.NONE
]

export default function ScopeProxy() {


    const dispatch = useDispatch()
    const scopeState = useSelector((state: any) => state.scopes)
    const frameState = useSelector((state: any) => state.frame)

    const analytics: Analytics = getAnalytics()

    // Check the url and set personalization accordingly
    // Run once on mount
    useEffect(() => {
        // get the subdomain from the url
        const url = window.location.href
        const subdomain = window.location.hostname.split('.')[0]
        
        // update scope given the subdomain
        const scope: ScopesEnum[] = [mapSubdomainToScope(subdomain)] 
        scopeDispatcher.setScopes(dispatch, scope)

        ga4.log(analytics, "land", { scope: scope[0], url: url })

    }, [])

    useEffect(() => {
        const jumpToFrame = mapScopeToLandingPage(scopeState.scopes[0])
        if (frameState.state == jumpToFrame) { return; }
 
        if (!hardRedirectScoeps.includes(scopeState.scopes[0])) {
            // hard redirect
            return;
        }

        frameDispatcher.setState(dispatch, analytics, jumpToFrame)
    }, [scopeState])

    return ( 
        <>
            <CrtFilter />
        </>
    )
}
