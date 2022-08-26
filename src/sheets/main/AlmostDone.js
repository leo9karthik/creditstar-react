import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Lottie from "lottie-react";
import animationData from '../../assests/json/loader_full.json';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_PUBLIC_URL } = process.env;

const AlmostDone = () => {
    const navigate = useNavigate();

    // const [secondLottie, setSecondLottie] = useState(false)

    useEffect(() => {


        setTimeout(() => {
            console.log("123");

            navigate("/congratulations", { replace: true });
        }, 3000);


    }, [])



    return (
        <div>

            {/* Header Starts */}
            <Header />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img inner-bg-img" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.jpg')` }}>
                </div>
                <div className="container">
                    {/* start */}
                    <div className="comm-box congo-box">

                        <div className="congo-lottie">
                            <Lottie
                                animationData={animationData}
                                options={{
                                    // loop: true,
                                    autoplay: true,
                                    animationData: animationData,
                                    width: 500,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                    }
                                }}

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