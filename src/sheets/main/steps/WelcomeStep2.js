import React, { useEffect } from 'react'
import Header from '../../../components/Header';
import LoanCalComp from '../../../components/LoanCalComp';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_PUBLIC_URL } = process.env;

const WelcomeStep2 = () => {

    /* steps */
    let steps = 2;
    let percentage = (steps / 4) * 100;
    /* steps end */



    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });


    const onSubmit = (data) => {
        let payload = data;
        console.log(payload);

        navigate("/welcome-step2-1", { replace: true });
    }


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

                            {/* start */}
                            <LoanCalComp />
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

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* start */}
                                    <div className="form-grp-box">
                                        {/* <div class="form-quest-box">
                                            <h6 class="form-quest">What’s your current address?</h6>
                                            <div class="form-para rm-for-mob">
                                                <p>We need your UK address history for the last 12 months</p>
                                            </div>
                                        </div> */}
                                        <h6 className="form-quest">What’s your current address?</h6>
                                        <div className="input-n-btn">
                                            <div className="post-input">
                                                <div className="form-grp">
                                                    <input
                                                        className="form-field"
                                                        type="text"
                                                        id="postcode"
                                                        name="postcode"
                                                        {...register("postcode", {
                                                            required: "UK postcode is required",
                                                        })}
                                                    />
                                                    <p className="form-label">UK postcode</p>
                                                </div>
                                                {errors.postcode &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.postcode.message}</p>
                                                    </div>
                                                }
                                            </div>
                                            {/* [disabled] */}
                                            <button className="button butn-blue" >Lookup address</button>
                                        </div>
                                    </div>
                                    {/* end */}
                                    <div>
                                        {/* start */}
                                        <div className="form-grp-box mb0">
                                            <p className="form-quest">Select your address</p>
                                            <div className="form-grp-field mb0">
                                                <div className="form-grp">
                                                    <select className="select-field form-field" name="select-fld" id="select-fld">
                                                        <option />
                                                        <option>32 Waltham Road, Bournemouth... 1</option>
                                                        <option>32 Waltham Road, Bournemouth... 2</option>
                                                        <option>32 Waltham Road, Bournemouth... 3</option>
                                                        <option>32 Waltham Road, Bournemouth... 4</option>
                                                        <option>32 Waltham Road, Bournemouth... 5</option>
                                                    </select>
                                                    <p className="form-label">Select Address</p>
                                                </div>
                                                {/* <div class="form-input-error">
                                                <i class="icon-input-error"></i>
                                                <p>A short piece of information</p>
                                            </div> */}
                                            </div>
                                        </div>
                                        {/* end */}
                                    </div>
                                </form>

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

export default WelcomeStep2
