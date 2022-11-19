import produce from "immer";
import { cookieManager } from "../util/cookieManager";


const getStateFromCookie = () => {
    const cookie = document.cookie;
    const cookieParts = cookie.split(";");
    for (let i = 0; i < cookieParts.length; i++) {
        const cookiePart = cookieParts[i];
        const cookiePartParts = cookiePart.split("=");
        if (cookiePartParts[0].trim() === "FRAME_STATE") {
            return cookiePartParts[1].trim();
        }
    }
    return FrameStatesEnum.LOGIN;
};

const setStateCookie = (state: number) => {
    cookieManager.setCookie("FRAME_STATE", state);
};

const getIsUsingCrtFromCookie = (): boolean => {
    const cookie = document.cookie;
    const cookieParts = cookie.split(";");
    for (let i = 0; i < cookieParts.length; i++) {
        const cookiePart = cookieParts[i];
        const cookiePartParts = cookiePart.split("=");
        if (cookiePartParts[0].trim() === "USE_CRT") {
            return cookiePartParts[1].trim() === "true";
        }
    }
    return true; // default to true
}

const setCrtCookie = (useCrt: boolean) => {
    cookieManager.setCookie("USE_CRT", useCrt);
}

export enum FrameStatesEnum {
    SHUTDOWN = 0,
    LOADING = 1,
    LOGIN = 2,
    DESKTOP = 3,
    FULLSCREEN_WINDOW = 4,
    ERROR = 5,
    OFF = 6,
}       

export interface FrameState {
    state: number;
    useCrt: boolean
    error?: string;
}

const initialState: FrameState = {
    state: getStateFromCookie() as number,
    useCrt: getIsUsingCrtFromCookie()
};


export interface FrameAction {
    type: string;
    payload?: FrameStatesEnum | string;
}


export const frameReducer = produce((state: FrameState = initialState, action: FrameAction) => {
    // console.log("reducing", action);s
    switch (action.type) {
        case "SET_STATE":
            const newData = { state: action.payload as FrameStatesEnum };
            // set cookie
            setStateCookie(newData.state);
            return Object.assign({}, state, newData);
        case "SET_ERROR":
            // set cookie
            setStateCookie(FrameStatesEnum.ERROR);
            return {
                ...state,
                state: FrameStatesEnum.ERROR,
                error: action.payload as string,
            };
        case "SET_USE_CRT":
            const payload: boolean = action.payload as unknown as boolean;
            setCrtCookie(payload);
            return {
                ...state,
                useCrt: payload
            }
        default:
            return state;
    }
})