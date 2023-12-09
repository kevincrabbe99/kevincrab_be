import { ScopesEnum } from "../reducers/scopeReducer"
import { Dispatch } from "redux"

export const scopeDispatcher = {




    // Overrides whatever scopes are currently set
    // Also sets the scopes cookie 
    setScopes: (dispatch: Dispatch, scopes: ScopesEnum[]) => {
        dispatch({type: "SET_SCOPES", payload: scopes})
    },     
    

}