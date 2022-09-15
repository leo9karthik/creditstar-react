import React from 'react'
import Lottie from "lottie-react";
import animationData from '../assests/json/loader_1.json';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    width: 500,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const Loader = () => {
    return (
        <div className="loaderBig">
            <div className="loaderWidth">
                <Lottie
                    animationData={animationData}
                    options={defaultOptions}

                />
            </div>
            {/* <img src={`${REACT_APP_PUBLIC_URL}/img/auth-img1.svg`} alt="" /> */}
        </div>
    )
}

export default Loader