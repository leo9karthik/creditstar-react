import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import LoanCalComp from '../../../components/LoanCalComp'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';

const { REACT_APP_PUBLIC_URL } = process.env;

const WelcomeStep2In1 = () => {

    /* steps */
    const [steps, setSteps] = useState(1);
    setTimeout(() => {
        setSteps(2)
    }, 1000);
    let percentage = (steps / 4) * 100;
    /* steps end */

    const navigate = useNavigate();


    const addressData = JSON.parse(localStorage.getItem('residentialAddress'));
    console.log(addressData);


    /* react-form-hook */
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors }
    // } = useForm({
    //     // mode: "onBlur",
    //     mode: "all",
    // });
    /* react-form-hook end */


    /* Post data */
    // const onSubmit = (data) => {
    //     let payload = data;
    //     console.log(payload);

    //     // redirect to dashboard
    //     navigate("/finances", { replace: true });
    // }

    const residencyDataFun = () => {


        // navigate("/finances", { replace: true });
    }

    const backToAddress = () => {
        navigate("/address-lookup", { replace: true });
    }
    /* Post data end */

    useEffect(() => {


        /* form service */
        formService.inputEmptyCheck();
        /* form service end */
    }, [])

    return (
        <div>
            {/* Header Starts */}
            <Header headerOne={true} />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img inner-bg-img add-bg-mob" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.png')` }}>
                </div>
                <div className="container">
                    {/* start */}
                    <div className="welcome-box">
                        <div className="welcome-right">

                            {/* start */}
                            <MontlyPaymentComp />
                            {/* end */}

                        </div>
                        <div className="welcome-left">
                            {/* start */}
                            <div className="comm-box">
                                <div className="comm-hdn-slide">
                                    <div className="comm-hdn-box">
                                        <h3 className="comm-hdn">
                                            Your residency
                                        </h3>
                                        <div className="comm-para">
                                            <p>You can find your address by adding your postal code.</p>
                                        </div>
                                    </div>
                                    <div className="comm-step">
                                        {/* <img src={`${REACT_APP_PUBLIC_URL}/img/steps.png`} alt="" /> */}

                                        <CircularProgressbar
                                            strokeWidth={8}
                                            value={percentage}
                                            text={`${steps}/4`}


                                            styles={buildStyles({
                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                strokeLinecap: 'butt',

                                                // Text size
                                                textSize: '22px',

                                                // Colors
                                                pathColor: `rgba(0, 230, 210, 1)`,
                                                textColor: '#938E9E',
                                                trailColor: '#F8F7F9',
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="addr-main-box">
                                    <div className="addr-card">
                                        {/* <h5 class="addr-hdn">Current address</h5> */}
                                        <h5 className="form-quest">Current address</h5>
                                        {/* start */}
                                        <div className="addr-box">
                                            <div className="addr-hdn-cross">
                                                <h6 className="addr-cont-hdn">{addressData?.address}</h6>
                                                <div className="addr-ico" onClick={() => backToAddress()}>
                                                    <i className="icon-close" />
                                                </div>
                                            </div>
                                            <div className="addr-cont-owner">
                                                <p className="addr-owner">{addressData?.residentialStatus}</p>
                                                <a href="#!" className="comm-link" onClick={() => backToAddress()}>Change</a>
                                            </div>
                                        </div>
                                        {/* end */}
                                    </div>
                                </div>
                                {/* [disabled] */}
                                <button className="button button--block" onClick={() => residencyDataFun()}>Continue</button>
                            </div>
                            {/* end */}
                        </div>
                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default WelcomeStep2In1