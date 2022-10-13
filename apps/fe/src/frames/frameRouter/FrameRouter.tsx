import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FrameState, FrameStatesEnum } from '../../reducers/frameReducer';
import Desktop from '../desktop/Desktop'
import Login from '../login/Login';



export default function FrameRouter() {

    // get frame from redux store
    const frame: FrameState = useSelector((state: any) => state.frame);

    return (
        <>
        {
            frame.state == 3 ? <Desktop /> : <Login />
        }
        </>
    )
}
