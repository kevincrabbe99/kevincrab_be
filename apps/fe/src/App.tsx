import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { scopeDispatcher } from './dispatchers/scopeDispatcher';
import CrtFilter from './frames/crtFilter/CrtFilter';
import { getIsScopeLockedFromCookie, ScopesEnum } from './reducers/scopeReducer';
import { mapSubdomainToScope } from './util/mappers/mapSubdomainToScope';

function App() {

  const dispatch = useDispatch()

  // Check the url and set personalization accordingly
  // Run once on mount
  useEffect(() => {
    // get the subdomain from the url
    const subdomain = window.location.hostname.split('.')[0]
    
    const scope: ScopesEnum[] = [mapSubdomainToScope(subdomain)] 
    const isLocked = false
    
    // if reset.kevincrab.be then remove the scope lock 
    if (subdomain === 'reset') {
      // remove cookie
      scopeDispatcher.unlockScope(dispatch)

      // redirect to me.kevincrab.be
      window.location.href = 'https://me.kevincrab.be'
    }

    // if the scope is not locked, set the scope
    if (getIsScopeLockedFromCookie()) {
      scopeDispatcher.lockScope(dispatch)
    } else {
      scopeDispatcher.unlockScope(dispatch)
      // dispatch the scope to the store
      scopeDispatcher.setScopes(dispatch, scope)
    }


  }, [])
  return (
    <div className="App" data-theme="dark">
      <CrtFilter />
    </div>
  );
}

export default App;
