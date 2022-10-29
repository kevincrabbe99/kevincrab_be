import { Analytics } from "firebase/analytics"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { FrameStatesEnum } from "../reducers/frameReducer"
import { ga4 } from "../util/ga4"

// frame dispatcher object
export const frameDispatcher = {
    shutdown: (dispatch: Dispatch, analytics: Analytics) => {
        dispatch({type: "SET_STATE", payload: FrameStatesEnum.SHUTDOWN})
        ga4.logScreenView(analytics, FrameStatesEnum.SHUTDOWN)
    },
    setState: (dispatch: Dispatch, analytics: Analytics, state: FrameStatesEnum) => {
        dispatch({type: "SET_STATE", payload: state})
        ga4.logScreenView(analytics, state)
    },

    // used to disable and enable the CRT
    setUseCrt: (dispatch: Dispatch, analytics: Analytics, useCrt: boolean) => {
        dispatch({type: "SET_USE_CRT", payload: useCrt})
        ga4.setUserProperty(analytics, "crt_enabled", useCrt)
    }

}
