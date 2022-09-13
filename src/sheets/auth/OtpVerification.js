import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import formService from '../../service/formService';
import AuthContext from '../../store/auth-context';
import { toast } from 'react-toastify';
import axios from 'axios';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const OtpVerification = () => {
    const authCtx = useContext(AuthContext);
    var instanceId = authCtx?.instanceId;
    // console.log(instanceId);
    const navigate = useNavigate();
    // console.log(authCtx);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });


    const onSubmit = (data) => {
        let inputData = data;
        // console.log(inputData?.verificationcode);

        let payload = {
            "action": "submit",
            "data": {
                "phoneCode": inputData?.verificationcode
            }
        }
        console.log(payload);



        axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data;
                authCtx.currentStepFunc(result?.currentStepId);
                console.log(result);

                // navigate("/welcome", { replace: true });
                navigate("/welcome1", { replace: true });
            })
            .catch((error) => {
                console.log(error);

                toast.error('Something went wrong!', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            });


    }

    useEffect(() => {

        /* form service */
        formService.inputEmptyCheck();
        /* form service end */
    }, [])


    return (
        <div>

            {/* Header Starts */}
            <header id="header">
                <div className="header-box">
                    <div className="head-container">
                        <div className="head-left">
                            <div className="logoBox">
                                <div className="logo">
                                    <picture>
                                        <source media="(max-width:990px)" srcSet={`${REACT_APP_PUBLIC_URL}/img/logo.svg`} />
                                        <img src={`${REACT_APP_PUBLIC_URL}/img/logo-white.svg`} alt="logo" />
                                        <img className="scroll-logo" src={`${REACT_APP_PUBLIC_URL}/img/logo.svg`} alt="logo" />
                                    </picture>
                                </div>
                            </div>
                        </div>
                        <div className="head-right">
                            <ul className="header-list">
                                {/* <li><a href="#">Already have an account?</a></li> */}
                            </ul>
                            <div className="menuBtn">
                                <a href="#" className="button butn-blue">Log in</a>
                                <div className="menu side-menu"><img src={`${REACT_APP_PUBLIC_URL}/img/menu.svg`} alt="Menu" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Side Menu */}
                <div className="menuOverlay" />
                <div className="mobile-menu">
                    <h3 className="close-menu">
                        <img src="" alt="cancel" />
                    </h3>
                    <ul className="header-list">
                        <li><a href="#">Already have an account?</a></li>
                    </ul>
                    <div className="mob-menu-footer">
                        <div className="footerIcon-section">
                            <img src={`${REACT_APP_PUBLIC_URL}/img/logo-white.svg`} alt="Company Head Office Contact Number" />
                        </div>
                        {/* <a className="mob-menu-footer--num" href="#" /> */}
                    </div>
                </div>
                {/* Side Menu End */}
            </header>
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/home-banner-img.png')` }}>
                    {/* <img src="./img/home-banner-img.png" alt=""> */}
                </div>
                {/* start */}
                <div className="comm-rev">
                    <div className="container">
                        <div className="banner-box">
                            <h2 className="banner-hdn">Get a loan online,<br /> in 2 minutes!</h2>
                            <div className="banner-para">
                                <p>Applying for a Creditstar loan is fast, secure, and reliable.</p>
                            </div>
                        </div>
                        {/* form */}
                        <div className="form-box">
                            {/* <div class="info-txt">
                                <i class="icon-info info-ico"></i>
                                <p>This won’t affect your credit score</p>
                            </div> */}
                            <div className="auth-hdn-box">
                                <h2 className="auth-hdn">
                                    Verification
                                </h2>
                                <div className="auth-para">
                                    <p>We have sent a code to
                                        <i><span>07554446921</span>. <a href="#"> Change</a></i>
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-grp-field">
                                    <div className="form-grp">
                                        <input
                                            className="form-field"
                                            type="number"
                                            id="verification-code"
                                            name="verificationcode"
                                            {...register("verificationcode", {
                                                required: "Verification code is required",
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message: "Enter a valid Verification code"
                                                }
                                            })}
                                        />
                                        <p className="form-label">Verification code</p>
                                    </div>
                                    {errors.verificationcode &&
                                        <div className="form-input-error">
                                            <i className="icon-input-error"></i>
                                            <p>A short piece of information</p>
                                        </div>
                                    }
                                </div>
                                <div className="auth-para ap-txt-cen mob-rm-resend">
                                    <p>Didn’t get the a code? <a href="#" className="comm-link">Click to resend</a></p>
                                </div>
                                {/* <div class="auth-btn"> */}
                                <button className="button button--block" type="submit"><span>Submit</span></button>
                            </form>
                            <button className="button butn-white button--block resend-mob"><span>Resend</span></button>
                            {/* </div> */}
                        </div>
                        {/* form end */}
                    </div>
                </div>
                {/* end */}
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default OtpVerification