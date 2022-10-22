
import React, { useEffect, useState } from 'react'
import "./volumeSlider.scss"

export default function VolumeSlider(props:any) {

    const toggleVolumeSlider = props.toggleVolumeSlider

    const [y, setY] = useState<number>(0)
    const [initY, setInitY] = useState<number>(0)
    const [isMouseMovingSlider, setIsMouseMovingSlider] = useState<boolean>(false)

    // listen for mousemove event
    useEffect(() => {
        const mouseMoveListener = (e: any) => {
            if (isMouseMovingSlider) {
                var newPos = (initY - e.clientY)
                if (newPos < 0) {
                    newPos = 0
                } else if (newPos > 100) {
                    newPos = 100
                }
                setY(newPos)
            }
        }

        const touchMoveListener = (e: any) => {
            if (isMouseMovingSlider) {
                var newPos = (initY - e.touches[0].clientY)
                if (newPos < 0) {
                    newPos = 0
                } else if (newPos > 100) {
                    newPos = 100
                }
                setY(newPos)
            }
        }   

        const mouseUpListener = (e: any) => {
            setIsMouseMovingSlider(false)
        }

        // window touch drag listener
    
        window.addEventListener('touchmove', touchMoveListener)
        window.addEventListener('mousemove', mouseMoveListener)
        window.addEventListener('mouseup', mouseUpListener)
        window.addEventListener('touchend', mouseUpListener)
        return () => {
            window.removeEventListener('mousemove', mouseMoveListener)
            window.removeEventListener('mouseup', mouseUpListener)
        }
    })
    
    const sliderThumbMouseDownEvent = (e: any) => {
        setIsMouseMovingSlider(true)
        setInitY(e.clientY + y)
    }

    const sliderThumbTouchDownEvent = (e: any) => {
        setIsMouseMovingSlider(true)
        setInitY(e.touches[0].clientY + y)
    }

    return (
        <div className="volume-slider-container">
            <div className="volumeSlider-wrapper">
                <div className="slider-label">Volume</div>
                <div className="volumeSlider-top">
                    <div className="volumeSlider-top-left">
                        <div className="volumeTriangle-mask">
                            <div className="volumeTriangle"></div>
                            <div className="volumeTriangle-border-bottomRight"></div>
                            <div className="volumeTriangle-border-bottomLeft"></div>
                        </div>
                    </div>
                    <div className="volumeSlider-top-right" onTouchStart={sliderThumbTouchDownEvent} onMouseDown={sliderThumbMouseDownEvent}>
                        <div className="slider-track"> </div>
                        <div className="slider-thumb"  style={{bottom:y}}> </div>
                    </div>
                </div>
                <div className="volumeSlider-bottom">
                    <input type="checkbox" ></input>
                    <label>Mute</label>
                </div>
            </div>
        </div>
    )
}
