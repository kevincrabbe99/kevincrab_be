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
}

export interface WindowState {
    windows: WindowConfig[];
    zOrder: number[];
    rerender?: boolean;
}

const initialState: WindowState = {windows: [], zOrder: []};

export const windowReducer = produce((state: WindowState = initialState, action: WindowAction) => {
    switch(action.type) {
        case "ADD_WINDOW":
            console.log("Adding window", action.payload?.title);
            // set id for new window instance
            var newWindowConfig = {
                ...action.payload,
                id: Math.random().toString(36).substring(7)
            }
            const newWindow = {
                windows: [...state.windows, newWindowConfig],
                zOrder: [state.windows.length, ...state.zOrder]
            }
            return newWindow;
        case "REMOVE_WINDOW":
            console.log("Removing window", action.payload);
            const newWindows = state.windows.filter((window) => window.id !== action.payload);
            const newZOrder = state.zOrder.filter((zIndex) => zIndex !== state.windows.length - 1);
            return {
                windows: newWindows,
                zOrder: newZOrder
            };
        case "FOCUS_WINDOW":
            const focusedWindow = state.windows.find((window) => window.id === action.payload) as WindowConfig;            
            const newWindowsOrder = [focusedWindow, state.windows.filter((window) => window.id !== action.payload)].flat();
            
            // assign object
            return {
                windows: newWindowsOrder,
                zOrder: state.zOrder,
                rerender: !state.rerender
            }
        default:
            return state;
    }   
                   
})