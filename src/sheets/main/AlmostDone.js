import React, { useRef } from 'react'
import Header from '../../components/Header'
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../assests/json/loader_full.json';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_PUBLIC_URL } = process.env;

const AlmostDone = () => {
    const navigate = useNavigate();


    /* animation */
    const loaderAnim = useRef(null);
    const animPlay = () => {
        loaderAnim.current.play();
    }
    const animCompleted = () => {
        console.log("Animation completed");

        navigate("/congratulations", { replace: true });
    }
    /* animation end */




    return (
        <div>

            {/* Header Starts */}
            <Header headerOne={true} />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img inner-bg-img add-bg-mob" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.jpg')` }}>
                </div>
                <div className="container">
                    {/* start */}
                    <div className="comm-box congo-box">

                        <div className="congo-lottie">

                            <Player
                                onEvent={event => {
                                    if (event === 'load') {
                                        animPlay();
                                    }

                                    if (event === 'complete') {
                                        animCompleted();
                                    }
                                }}
                                ref={loaderAnim}
                                autoplay={true}
                                controls={true}
                                src={animationData}
                            />



                        </div>
                        <div className="congo-cont">
                            <h4 className="congo-hdn">Almost done</h4>
                            <div className="congo-para">
                                <p>We are processing your application.<br /> This won’t take a second</p>
                            </div>
                        </div>

                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default AlmostDone