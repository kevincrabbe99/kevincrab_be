import { getAnalytics } from 'firebase/analytics'
import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { frameDispatcher } from '../../dispatchers/frameDispatcher'
import { FrameStatesEnum } from '../../reducers/frameReducer'

import "./off.scss"

export default function Off() {

    const dispatch = useDispatch()

    const [topOffset, setTopOffset] = React.useState(0)
    const [currentImage, setCurrentImage] = React.useState("0001.png")
    const [currentImageIndex, setCurrentImageIndex] = React.useState(1)
    const [reachedBottom, setReachedBottom] = React.useState(false)

    const dummyEndRef = React.useRef<HTMLDivElement>(null)


    const analytics = getAnalytics()


    // listen for scroll events
    const handleScroll = (e: any) => {
        setTopOffset(e.target.scrollTop)
    }

    const autoScroll = () => {
        console.log("scorlling")
        // smooth scroll to endref
        dummyEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }   

    const jumpToDesktop = () => {
        console.log("Jumping to desktop")
        frameDispatcher.setState(dispatch, analytics, FrameStatesEnum.DESKTOP)
    }

    const windowClicked = () => {
        const selectedImageNumber = Math.floor(topOffset / 20) + 1
        console.log("Selected image number: " + reachedBottom)
        // jump to desktop
        // if (reachedBottom) {
            runStartup()
        // }
    }

    const runStartup = () => {

        setCurrentImage("../anim_special/all_off.png")
        setTimeout(() => {
            setCurrentImage("0065.png")
        }, 300)
        setTimeout(() => {
            setCurrentImage("../anim_special/all_off.png")
        }, 600)
        setTimeout(() => {
            setCurrentImage("0065.png")
        }, 900)
        setTimeout(() => {
            setCurrentImage("../anim_special/all_off.png")
        }, 1200)
        setTimeout(() => {
            setCurrentImage("0065.png")
        }, 1500)
        setTimeout(() => {
            setCurrentImage("../anim_special/all_off.png")
        }, 1800)
        // setTimeout(() => {
        //     setCurrentImage("0065.png")
        // }, 2600)



        setTimeout(() => {
            setCurrentImage("../anim_special/one_on_purple.png")
        }, 2000)
        // setTimeout(() => {
        //     setCurrentImage("../anim_special/one_on_purple.png")
        // }, 2000)
        setTimeout(() => {
            setCurrentImage("../anim_special/all_on.png")
        }, 3000)

        setTimeout(() => {
            jumpToDesktop()
        }, 3500)
    }

    // used to render images
    useEffect(() => {

        console.log("Offset: ", topOffset)

        const selectedImageNumber = Math.floor(topOffset / 20) + 1
        console.log("Selected Image Number: ", selectedImageNumber)
        
        if (selectedImageNumber > 55) {
            console.log("Reached bottom")
            setReachedBottom(true)
        }

        if (selectedImageNumber > 65) {
            return;
        }

        // format name of new image
        // if (selectedImageNumber % 1 == 1) {
            const newImage = (selectedImageNumber).toFixed(0).padStart(4, "0") + ".png"
            setCurrentImage(newImage)
            setCurrentImageIndex(selectedImageNumber)
        // }

    }, [topOffset])

    // listen for click on window
    useEffect(() => {
        window.addEventListener("click", windowClicked)
        return () => {
            window.removeEventListener("click", windowClicked)
        }
    }, [])


    // used to control opacity of helpter text
    useEffect(() => {
            
            const opacity = (Math.floor(topOffset / 20) + 1) / 100

            const helperText = document.getElementById("helpterText")
            const genText = document.getElementById("genText")
            if (helperText && genText) {
                helperText.style.opacity = opacity.toString()

                const oppositeOpacity = 1 - (opacity * 2)
                genText.style.opacity = oppositeOpacity.toString()
            }
    
    }, [topOffset])

  return (
    <div 
         className="off-wrapper"
         onScroll={handleScroll}>
        <div className="img-wrapper">
            <div className="img-wrapper-inner">
                <img src={`./images/anim/${currentImage}`} alt="off" />
            </div>
        </div>

        <div className="scroll-content">
            {/* Just a very tall hidden element */}

            <div className="scroll-content-inner">
                <div className="sc-prompt">
                    <label>scroll down to startup</label>
                    <div className="sc-button  crt-heavy">
                        <button className="crt-text" onClick={autoScroll}>SCROLL</button>
                    </div>
                </div>
            </div>

            <div className='dummy-bottom-div' ref={dummyEndRef}>

            </div>
        </div>



        <div className="fixed-content">
            <div className="fixed-content-inner crt-heavy">
                <label id="helpterText">
                    {
                        isMobile ? "Touch anywhere to start" : "Click anywhere to start"
                    }
                </label>

                <div id="genText">
                    <p className="url-text">{window.location.href}</p>
                    <p className="crt-text-heavy"><span className="pt-title">My Personal Website </span><br></br>
                    A Win95 Emulator made with ReactJS</p>
                    <p>If you want to skip the startup sequence and <b>jump to the desktop</b> click <span className="span-link crt-text-heavy" onClick={() => jumpToDesktop()}>here</span></p>

                    <p style={{paddingTop: "4em"}}>If you don't want the whole experience, here are some quick links</p>
                    <ul className="pt-list">
                        <li><a href="https://linkedin.com/in/kevincrab-beep" target="_blank">LinkedIn</a></li>
                        <li><a href="https://instagram.com/kevincrab.be" target="_blank">Instagram</a></li>
                        <li><a href="https://kevincrab.be/contact" target="_blank">Contact Me!</a></li>
                    </ul>
                </div>

            </div>
        </div>

    </div>
  )


}
