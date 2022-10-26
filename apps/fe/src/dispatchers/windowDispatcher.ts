import { Dispatch } from "redux"

import { WindowConfig, WindowTypesEnum } from "../reducers/windowReducer";

import { getDefaultJsonFromWindowType } from "../util/helpers";

export const windowDispatcher = {

    // Creates a new Window Object
    openWindow: (dispatch: Dispatch, type: WindowTypesEnum, param?: string) => {
        const defaultWindowConfig: WindowConfig = getDefaultJsonFromWindowType(type);
        defaultWindowConfig.contentData = param;
        dispatch({ type: "ADD_WINDOW", payload: defaultWindowConfig })    
    },

    // bring the window to the front & unminimize
    focusWindow: (dispatch: Dispatch, id: string) => {
        dispatch({ type: "FOCUS_WINDOW", payload: id })
    },

    // set a window minimized state to true
    minimizeWindow: (dispatch: Dispatch, id: string) => {
        dispatch({ type: "MINIMIZE_WINDOW", payload: id })
    },

    // remove a window ie. EXIT
    closeWindow: (dispatch: Dispatch, id: string) => {
        dispatch({ type: "REMOVE_WINDOW", payload: id })
    },

    // Should be called on shutdown and when all windows are closed
    // The purpose of this is to clean up the clutter of hidden windows.
    deleteAllWindows: (dispatch: Dispatch) => {
        dispatch({type: "RESET_WINDOWS"})
    }
}


