import { WindowConfig, WindowTypesEnum } from "../reducers/windowReducer";

export interface WindowAction {
    type: String;
    payload?: WindowConfig;
}

export const addWindow = (windowConfig: WindowConfig): WindowAction => {
    return {
        type: "ADD_WINDOW",
        payload: windowConfig,
    };
}