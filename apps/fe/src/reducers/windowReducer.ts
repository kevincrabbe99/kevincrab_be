import produce from "immer";
import { SettingsPageTypesEnum } from "../components/window/WindowContent";
import { SettingsWindowTypesEnum } from "../components/windowPages/settings/SettingsPage";
import { OverrideSettingsDisplaySize } from "../components/windowPages/settings/subapps/display/DisplaySettingsPage";
import { OverrideSettingsPersonalizationSize } from "../components/windowPages/settings/subapps/personalization/PersonalizationSettingsPage";

export enum WindowTypesEnum {
    LOGIN = 0,
    WEB = 1,
    DOCUMENT = 2,
    FOLDER = 3,
    BROWSER = 4,
    SETTINGS = 5,
    RUN = 6,
    ABOUT = 7,
    MESSENGER=8,
    FALLBACK=9,
    HELP=10,
    GENERIC_MODAL=11,
}  

export type WindowPosition = {
    x: number;
    y: number;
}

export type WindowSize = {
    width: number;
    height: number;
}

export type WindowConfig = {
    id?: string;
    type: WindowTypesEnum;
    position: WindowPosition;
    size: WindowSize;
    title: string;
    icon?: string;
    showXButton?: boolean;
    minimized?: boolean;
    minimizable?: boolean;
    maximized?: boolean;
    maximizable?: boolean;
    exited?: boolean;
    contentData?: any;
    helpData?: any;
}

export interface WindowState {
    windows: WindowConfig[];
    showingWindows: WindowConfig[];
    minimizedWindows: WindowConfig[];
    maximizedWindows: WindowConfig[];
    closedWindows: WindowConfig[];
    runningWindows: WindowConfig[];
    top?: string;
}

const initialState: WindowState = {
    windows: [], 
    showingWindows: [], 
    minimizedWindows: [], 
    maximizedWindows: [],
    closedWindows: [], 
    runningWindows: [],
    top: undefined
};

export interface WindowAction {
    type: String;
    payload?: WindowConfig;
}

export const windowReducer = produce((state: WindowState = initialState, action: WindowAction) => {
    switch(action.type) {
        case "ADD_WINDOW":
            // set id for new window instance
            var newWindowConfig: any = {
                ...action.payload,
                minimized: false,
                exited: false,
                id: Math.random().toString(36).substring(7)
            }

            // set window title
            newWindowConfig.title = getModifiedWindowTitle(newWindowConfig);

            // modify window size if needed
            newWindowConfig.size = getModifiedWindowSize(newWindowConfig);

            // debugger
            // check if window exists with the same position
            const setWindowInitPosition = (editingWindowConfig: WindowConfig): WindowConfig => {
                var windowInSamePosExists = state.windows.find((window) => {
                    return (window.exited === undefined || window.exited === false)
                    && window.position.x === editingWindowConfig.position!.x 
                    && window.position.y === editingWindowConfig.position!.y 

                });
                if (windowInSamePosExists) {
                    
                    let justEditedWindowConfig = {
                        ...editingWindowConfig,
                        position: {
                            x: editingWindowConfig.position!.x + 20,
                            y: editingWindowConfig.position!.y + 20
                        }
                    }
                    return setWindowInitPosition(justEditedWindowConfig);    
                    
                    // setWindowInitPosition();
                } else {
                    return editingWindowConfig
                }
            }
            newWindowConfig = setWindowInitPosition(newWindowConfig);

            // add to showingWindows
            const newShowingWindows1 = state.showingWindows.concat(newWindowConfig);

            // add to runningWindows
            const newRunningWindows1 = state.runningWindows.concat(newWindowConfig);

            return {
                ...state,
                windows: [...state.windows, newWindowConfig],
                showingWindows: newShowingWindows1,
                runningWindows: newRunningWindows1,
                top: newWindowConfig.id
            }
        case "REMOVE_WINDOW":
            const newWindowsWithoutPayload = state.windows.map((window) => {
                // set exited to true on windowConfig
                if (window.id === action.payload) {
                    return {
                        ...window,
                        exited: true
                    }
                } else {
                    return window
                }
            })

            // remove from showingWindows
            const newShowingWindows = state.showingWindows.filter((window) => {
                return window.id !== action.payload
            })

            // add to closedWindows
            const newClosedWindows = state.closedWindows.concat(state.windows.filter((window) => {
                return window.id === action.payload
            }))

            // remove from minimizedWindows
            const newMinimizedWindows = state.minimizedWindows.filter((window) => {
                return window.id !== action.payload
            })

            // remove from runningWindows
            const newRunningWindows = state.runningWindows.filter((window) => {
                return window.id !== action.payload
            })

            var newTop: WindowConfig | undefined = undefined;
            // get new top
            var newTop: WindowConfig | undefined = state.showingWindows.find((window) => {
                return window.id !== action.payload
            })
            // if no windows are open then set top to undefined
            if (state.showingWindows.length === 0) {
                newTop = undefined 
            }

            // if no windows exist, return initial state
            if (newRunningWindows.length === 0) {
                return initialState;
            }

            return {
                ...state,
                windows: newWindowsWithoutPayload,
                showingWindows: newShowingWindows,
                closedWindows: newClosedWindows,
                minimizedWindows: newMinimizedWindows,
                runningWindows: newRunningWindows,
                top: newTop?.id
            }
        case "MINIMIZE_WINDOW":
            const isMinimizing = !state.minimizedWindows.find((window) => {
                return window.id === action.payload
            })?.minimized;
            const newWindowsWithMinimized = state.windows.map((window) => {
                if (window.id === action.payload) {
                    return {
                        ...window,
                        minimized: !window.minimized 
                    }
                } else {
                    return window
                }
            })

            var newTop: WindowConfig | undefined = undefined;
            if(isMinimizing) {
                // get new top
                var newTop: WindowConfig | undefined = state.showingWindows.find((window) => {
                    return window.id !== action.payload
                })
                // if no windows are open then set top to undefined
                if (state.showingWindows.length === 0) {
                    newTop = undefined 
                }
            } else {
                var newTop = action.payload
            }

            

            const shouldToggleMinimize = state.windows.find((window) => {
                return window.id === action.payload && (
                    (window.minimized === false
                    && state.top === window.id) ||
                    (window.minimized === true)
                )
            })

            var newMinimizedWindows2
            var newShowingWindows2
            if (isMinimizing) {
                // add to minimizedWindows
                newMinimizedWindows2 = state.minimizedWindows.concat(state.windows.filter((window) => {
                    return window.id === action.payload && window.minimized === false
                }))
    
                // remove from showingWindows
                newShowingWindows2 = state.showingWindows.filter((window) => {
                    return window.id !== action.payload
                })
            } else {
                // remove from minimizedWindows
                newMinimizedWindows2 = state.minimizedWindows.filter((window) => {
                    return window.id !== action.payload
                })
    
                // add to showingWindows
                newShowingWindows2 = state.showingWindows.concat(state.windows.filter((window) => {
                    return window.id === action.payload && window.minimized === true
                }))
            }
            

            return {
                ...state,
                top: newTop && newTop!.id,
                windows: shouldToggleMinimize ? newWindowsWithMinimized : state.windows,
                newMinimizedWindows: newMinimizedWindows2,
                showingWindows: newShowingWindows2
            }
        
        case "MAXIMIZE_WINDOW":
            // add to maximizedWindows
            const mxmz_newMaximizedWindows = state.maximizedWindows.concat(state.windows.filter((window) => {
                return window.id === action.payload && !window.maximized
            }))

            // remove from minimizedWindows 
            // (just incase)
            const mxmz_newMinimizedWindows = state.minimizedWindows.filter((window) => {
                return window.id !== action.payload
            })
            
            // set as top window
            const mxmz_newTop = action.payload

            // set maximized to true
            const mxmz_newWindows = state.windows.map((window) => {
                if (window.id === action.payload) {
                    return {
                        ...window,
                        maximized: true
                    }
                } else {
                    return window
                }
            })

            return {
                ...state,
                top: mxmz_newTop,
                minimizedWindows: mxmz_newMinimizedWindows,
                maximizedWindows: mxmz_newMaximizedWindows,
                windows: mxmz_newWindows
            }


        case "UNMAXIMIZE_WINDOW":
            // remove from maximizedWindows
            const unmzmz_newMaximizedWindows = state.maximizedWindows.filter((window) => {
                return window.id !== action.payload
            })

            // set maximized to false
            const unmzmz_newWindows = state.windows.map((window) => {
                if (window.id === action.payload) {
                    return {
                        ...window,
                        maximized: false
                    }
                } else {
                    return window
                }
            })

            // set as top window
            const unmzmz_newTop = action.payload

            return {
                ...state,
                top: unmzmz_newTop,
                maximizedWindows: unmzmz_newMaximizedWindows,
                windows: unmzmz_newWindows
            }

        case "FOCUS_WINDOW":
            if (state.windows.length > 0) {


                const newWindowsWithNewFocus = state.windows.map((window) => {
                    if (window.id === action.payload) {
                        return {
                            ...window,
                            minimized: false
                        }
                    } else {
                        return window
                    }
                })

                // remove from monimizedWindows
                const newMinimizedWindows3 = state.minimizedWindows.filter((window) => {
                    return window.id !== action.payload
                })

                // add to showingWindows
                const newShowingWindows3 = state.showingWindows.concat(state.windows.filter((window) => {
                    return window.id === action.payload && window.minimized === true
                }))
                
                return {
                    ...state,
                    windows: newWindowsWithNewFocus,
                    minimizedWindows: newMinimizedWindows3,
                    showingWindows: newShowingWindows3,
                    top: action.payload
                }
            }
            return state
        case "RESET_WINDOWS":

            return {
                ...state,
                windows: [],
                minimizedWindows: [],
                maximizedWindows: [],
                closedWindows: [],
                showingWindows: [],
                runningWindows: [],
                top: null
            }

            break;
        default:
            return state;
    }   
                   
})


// Helper function to return a modified title based on the config 
const getModifiedWindowTitle = (windowConfig: WindowConfig): string => {
    var newTitle = "";
    switch(windowConfig.type) {
        case WindowTypesEnum.BROWSER:
            newTitle = windowConfig.contentData;
            break;
        case WindowTypesEnum.FOLDER:
            newTitle = "Exploring... " + windowConfig.contentData;
            // check if window is control panel
            if (windowConfig.contentData === "Control Panel") {
                newTitle = "Control Panel"
            }
            break;
        case WindowTypesEnum.DOCUMENT:
            newTitle = reduceDocumentPathToName(windowConfig.contentData);
            break;
        case WindowTypesEnum.SETTINGS:
            newTitle = "Settings";
            switch(windowConfig.contentData) {
                case SettingsWindowTypesEnum.DISPLAY:
                    newTitle = "Display Settings";
                    break;
                case SettingsWindowTypesEnum.PERSONALIZATION:
                    newTitle = "Personalization Settings";
                    break;
                default:
            }
            break;
        default:
            newTitle = windowConfig.title;
    }
    return newTitle;
}


const getModifiedWindowSize = (windowConfig: WindowConfig): WindowSize => {
    var newWindowSize: WindowSize = windowConfig.size;
    
    // check window type
    switch(windowConfig.type) {
        case WindowTypesEnum.SETTINGS:

            // check window contentData
            switch(windowConfig.contentData) {
                case SettingsWindowTypesEnum.DISPLAY:
                    newWindowSize = OverrideSettingsDisplaySize
                    break;
                case SettingsWindowTypesEnum.PERSONALIZATION:
                    newWindowSize = OverrideSettingsPersonalizationSize
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

    return newWindowSize;
}

// Helper function get get the document name from the url
const reduceDocumentPathToName = (path: string): string => {

    if (path === undefined) {
        return "New Document"
    }

    var lastSection;
    try {
        lastSection = path.split('/').pop();
    } catch (e: any) {
        return path;
    }

    // remove text after '#
    if (lastSection!.includes('#')) {
        lastSection = lastSection!.split('#')[0];
    }

    // replace all '_' with ' '
    lastSection = lastSection!.replace(/_/g, ' ');

    return lastSection!;
}