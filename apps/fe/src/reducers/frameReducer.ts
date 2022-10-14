import { FrameAction } from "../actions/frameActions";
import produce from "immer";


const getStateFromCookie = ()=> {
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
    document.cookie = `FRAME_STATE=${state};path=/`;
};

export enum FrameStatesEnum {
    LOADING = 1,
    LOGIN = 2,
    DESKTOP = 3,
    FULLSCREEN_WINDOW = 4,
    ERROR = 5,
}       

export interface FrameState {
    state: number;
    error?: string;
}

const initialState: FrameState = {
    state: getStateFromCookie() as number,
};




export const frameReducer = produce((state: FrameState = initialState, action: FrameAction) => {
    console.log("reducing", action);
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
                state: FrameStatesEnum.ERROR,
                error: action.payload as string,
            };
        default:
            return state;
    }
})