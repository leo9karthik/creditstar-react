import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../assests/json/loader_1.json';



const Loader = () => {

    /* animation */
    const loaderAnim = useRef(null);
    const animPlay = () => {
        loaderAnim.current.play();
    }
    /* animation end */

    return (
        <div className="loaderBig">
            <div className="loaderWidth">

                <Player
                    onEvent={event => {
                        if (event === 'load') {
                            animPlay();
                        }
                    }}
                    ref={loaderAnim}
                    autoplay={true}
                    controls={true}
                    src={animationData}
                />


            </div>
            {/* <img src={`${REACT_APP_PUBLIC_URL}/img/auth-img1.svg`} alt="" /> */}
        </div>
    )
}

export default Loader