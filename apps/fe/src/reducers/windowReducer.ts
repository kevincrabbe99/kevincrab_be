import { WindowAction } from "../actions/windowAction";
import produce from "immer";

export enum WindowTypesEnum {
    LOGIN = 0,
    WEB = 1,
    DOCUMENT = 2
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
    exited?: boolean;
}

export interface WindowState {
    windows: WindowConfig[];
    top?: string;
}

const initialState: WindowState = {windows: []};

export const windowReducer = produce((state: WindowState = initialState, action: WindowAction) => {
    switch(action.type) {
        case "ADD_WINDOW":
            console.log("Adding window", action.payload?.title);
            // set id for new window instance
            var newWindowConfig: any = {
                ...action.payload,
                minimized: false,
                exited: false,
                id: Math.random().toString(36).substring(7)
            }
            // debugger
            // check if window exists with the same position
            const setWindowInitPosition = (editingWindowConfig: WindowConfig): WindowConfig => {
                var windowInSamePosExists = state.windows.find((window) => {
                    return (window.exited === undefined || window.exited === false)
                    && window.position.x === editingWindowConfig.position!.x 
                    && window.position.y === editingWindowConfig.position!.y 

                });
                console.log("chedked")
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
            console.log("set position: ", newWindowConfig.position);

            const newWindow = {
                windows: [...state.windows, newWindowConfig],
                top: newWindowConfig.id
            }
            return newWindow;
        case "REMOVE_WINDOW":


            // set exited = true for window with id of action.payload
            const newWindows = state.windows.map((window) => {
                if (window.id === action.payload) {
                    return {
                        ...window,
                        exited: true
                    }
                } else {
                    return window
                }
            })
            return {
                ...state,
                windows: newWindows
            }


            // var exitedConfig: WindowConfig = state.windows.find((window) => window.id === action.payload) as WindowConfig;
            // exitedConfig = {
            //     ...exitedConfig,
            //     exited: true
            // }
            // var newState = {
            //     ...state,
            //     windows: [exitedConfig, ...state.windows.filter((window) => window.id !== action.payload)],
            // }

            // return newState

        case "FOCUS_WINDOW":
            if (state.windows.length > 0) {
                const focusedWindow = state.windows.find((window) => window.id === action.payload) as WindowConfig;            
                const newWindowsOrder = [focusedWindow, state.windows.filter((window) => window.id !== action.payload)].flat();
                return {
                    windows: state.windows,
                    top: action.payload
                }
            }
            return state
        default:
            return state;
    }   
                   
})