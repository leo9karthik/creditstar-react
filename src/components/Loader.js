import React, { useRef } from 'react'

/* plugin */
import { Player } from '@lottiefiles/react-lottie-player';
/* plugin end */

/* component */
import animationData from '../assests/json/loader_1.json';
/* component end */



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
                    loop={true}
                    controls={true}
                    src={animationData}
                />


            </div>
        </div>
    )
}

export default Loader