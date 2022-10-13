import { FrameAction } from "../actions/frameActions";
import produce from "immer";

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
    state: FrameStatesEnum.LOGIN,
};



export const frameReducer = produce((state: FrameState = initialState, action: FrameAction) => {
    console.log("reducing", action);
    switch (action.type) {
        case "SET_STATE":
            const newData = { state: action.payload as FrameStatesEnum };
            return Object.assign({}, state, newData);
        case "SET_ERROR":
            return {
                state: FrameStatesEnum.ERROR,
                error: action.payload as string,
            };
        default:
            return state;
    }
})