import React, { useRef } from 'react'

/* plugin */
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
/* plugin end */

/* service */
import { toasterConfig } from '../../config/Constant';
/* service end */

/* component */
import animationData from '../../assests/json/failure.json';
import Header from '../../components/Header'
import InnerBgComp from '../../components/InnerBgComp';
/* component end */

const { REACT_APP_CONTACTUSURL } = process.env;

const Failure = () => {

    /* animation */
    const loaderAnim = useRef(null);
    const animPlay = () => {
        loaderAnim.current.play();
        localStorage.removeItem("currentStep");

        toast.error('Sorry but we can’t proceed with your application right now.', toasterConfig);
    }

    // const animCompleted = () => {
    //     console.log("Animation completed");
    // }
    /* animation end */


    return (
        <div>

            {/* Header Starts */}
            <Header headerOne={true} />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <InnerBgComp classes={"inner-bg-img add-bg-mob"} />
                <div className="container">
                    {/* start */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="comm-box congo-box">

                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="congo-lottie mb0">

                            <Player
                                onEvent={event => {
                                    if (event === 'load') {
                                        animPlay();
                                    }

                                    // if (event === 'complete') {
                                    //     animCompleted();
                                    // }
                                }}
                                ref={loaderAnim}
                                autoplay={true}
                                // controls={true}
                                loop={true}
                                src={animationData}
                            />



                        </motion.div>
                        <div className="congo-cont">
                            <motion.h4
                                initial={{ y: 60, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="congo-hdn">
                                Something went wrong
                            </motion.h4>
                            <motion.div
                                initial={{ y: 60, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="congo-para">
                                <p>Sorry but we can’t proceed with your <br /> application right now.</p>
                            </motion.div>

                            <a href={REACT_APP_CONTACTUSURL} className="button butn-blue line mt24">Contact us</a>
                        </div>

                    </motion.div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default Failure