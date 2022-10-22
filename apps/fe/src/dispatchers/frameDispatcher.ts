import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { FrameStatesEnum } from "../reducers/frameReducer"

// frame dispatcher object
export const frameDispatcher = {
    shutdown: (dispatch: Dispatch) => {
        dispatch({type: "SET_STATE", payload: FrameStatesEnum.SHUTDOWN})
    },
    setState: (dispatch: Dispatch, state: FrameStatesEnum) => {
        dispatch({type: "SET_STATE", payload: state})
    }
}
