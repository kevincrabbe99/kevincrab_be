import { FrameStatesEnum } from "../reducers/frameReducer";

export interface FrameAction {
    type: string;
    payload?: FrameStatesEnum | string;
}

export const login = (): FrameAction => {
    return {
        type: "SET_STATE",
        payload: FrameStatesEnum.DESKTOP,
    };
}