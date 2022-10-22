import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { FrameState, FrameStatesEnum } from '../../reducers/frameReducer';
import FrameRouter from '../frameRouter/FrameRouter';
import "./crtFilter.scss"

export default function CrtFilter() {

    const frame: FrameState = useSelector((state: any) => state.frame);
    const crtRef = useRef<HTMLDivElement>(null)
    const crtTextRef = useRef<HTMLDivElement>(null)

    // set crt heavy if on shutdown
    useEffect(() => {
        if (frame.useCrt) {
        // remove all styles
        crtRef.current?.classList.remove("crt")
        crtRef.current?.classList.remove("crt-heavy")
        crtTextRef.current?.classList.remove("crt-text-heavy")
        crtTextRef.current?.classList.remove("crt-text-heavy")

        if(frame.state === FrameStatesEnum.SHUTDOWN) {
            crtRef.current?.classList.add("crt-heavy")
            crtTextRef.current?.classList.add("crt-text-heavy")
        } else {
            crtRef.current?.classList.add("crt")
            crtTextRef.current?.classList.add("crt-text")
        } 
        }
    }, [frame])

    // disable crt depending on frame.useCrt
    useEffect(() => {
        if(!frame.useCrt) {
        crtRef.current?.classList.remove("crt")
        crtRef.current?.classList.remove("crt-heavy")
        crtTextRef.current?.classList.remove("crt-text-heavy")
        crtTextRef.current?.classList.remove("crt-text-heavy")
        }
    }, [frame.useCrt])

  return (
    <>
        <div className="crt" ref={crtRef}>
        </div>
        <span className="crt-text" ref = {crtTextRef}>
            <FrameRouter />
        </span>
    </>

  )
}
