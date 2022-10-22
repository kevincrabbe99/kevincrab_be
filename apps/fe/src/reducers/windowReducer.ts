import { WindowAction } from "../actions/windowAction";
import produce from "immer";

export enum WindowTypesEnum {
    LOGIN = 0,
    WEB = 1,
    DOCUMENT = 2,
    FOLDER = 3,
    BROWSER = 4,
    SETTINGS = 5,
    RUN = 6,
    ABOUT = 7,
    HELP = 8,
    FALLBACK=9
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
    title: String;
    icon?: String;
    showXButton?: boolean;
    minimized?: boolean;
    minimizable?: boolean;
    exited?: boolean;
    contentData?: any;
    helpData?: any;
}

export interface WindowState {
    windows: WindowConfig[];
    showingWindows: WindowConfig[];
    minimizedWindows: WindowConfig[];
    closedWindows: WindowConfig[];
    top?: string;
}

const initialState: WindowState = {windows: [], showingWindows: [], minimizedWindows: [], closedWindows: []};

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
            var newTitle = "";
            switch(newWindowConfig.type) {
                case WindowTypesEnum.BROWSER:
                    newTitle = newWindowConfig.contentData;
                    break;
                case WindowTypesEnum.FOLDER:
                    newTitle = "Exploring... " + newWindowConfig.contentData;
                    break;
                case WindowTypesEnum.DOCUMENT:
                    // get text after last '/' in newWindowConfig.contentData
                    newTitle = reduceDocumentPathToName(newWindowConfig.contentData);
                    // newTitle = newWindowConfig.contentData.split('/').pop();
                    break;
                default:
                    newTitle = newWindowConfig.title;
            }
            newWindowConfig.title = newTitle;

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
            const newShowingWindows1 = [...state.showingWindows, newWindowConfig];

            const newWindow = {
                windows: [...state.windows, newWindowConfig],
                showingWindows: newShowingWindows1,
                top: newWindowConfig.id
            }
            return newWindow;
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

            // if no windows exist, return initial state
            if (newWindowsWithoutPayload.length === 0) {
                return initialState;
            }

            return {
                ...state,
                windows: newWindowsWithoutPayload,
                showingWindows: newShowingWindows,
                closedWindows: newClosedWindows,
                minimizedWindows: newMinimizedWindows
            }
        case "MINIMIZE_WINDOW":
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

            const shouldSetTop = state.windows.find((window) => {
                return window.id === action.payload && window.minimized === false
            })

            const shouldToggleMinimize = state.windows.find((window) => {
                return window.id === action.payload && (
                    (window.minimized === false
                    && state.top === window.id) ||
                    (window.minimized === true)
                )
            })

            // add to minimizedWindows
            const newMinimizedWindows2 = state.minimizedWindows.concat(state.windows.filter((window) => {
                return window.id === action.payload && window.minimized === false
            }))

            // remove from showingWindows
            const newShowingWindows2 = state.showingWindows.filter((window) => {
                return window.id !== action.payload
            })

            return {
                ...state,
                top: shouldSetTop ? action.payload : state.top,
                windows: shouldToggleMinimize ? newWindowsWithMinimized : state.windows,
                newMinimizedWindows: newMinimizedWindows2,
                showingWindows: newShowingWindows2
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
                
                return {
                    windows: newWindowsWithNewFocus,
                    minimizedWindows: newMinimizedWindows3,
                    top: action.payload
                }
            }
            return state
        case "RESET_WINDOWS":

            return {
                windows: [],
                minimizedWindows: [],
                closedWindows: [],
                showingWindows: []
            }

            break;
        default:
            return state;
    }   
                   
})

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