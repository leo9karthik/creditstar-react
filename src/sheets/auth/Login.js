import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import formService from '../../service/formService';
import { useForm } from "react-hook-form";
import AuthContext from '../../store/auth-context';

const { REACT_APP_PUBLIC_URL } = process.env;

const Login = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(authCtx);

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

        navigate("/otp-verification", { replace: true });
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
                            <div className="info-txt">
                                <i className="icon-info info-ico" />
                                <p>This won’t affect your credit score</p>
                            </div>
                            <div className="auth-hdn-box">
                                <h2 className="auth-hdn">
                                    Your mobile number
                                </h2>
                                <div className="auth-para">
                                    <p>By signing up, you will get a verification code.</p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-grp-field">
                                    <div className="form-grp">
                                        <input
                                            className="form-field"
                                            type="number"
                                            id="mobilenumber"
                                            name="mobilenumber"
                                            {...register("mobilenumber", {
                                                required: "UK Mobile Number is required",
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message: "Enter a valid Mobile Number"
                                                }
                                            })}
                                        />
                                        <p className="form-label">UK mobile number</p>
                                    </div>
                                    {/* {errors.mobilenumber && <p className="error-msg">{errors.mobilenumber.message}</p>} */}
                                    {errors.mobilenumber &&
                                        <div className="form-input-error">
                                            <i className="icon-input-error"></i>
                                            <p>{errors.mobilenumber.message}</p>
                                        </div>
                                    }

                                </div>
                                <button className="button button--block" type="submit"><span>Send code</span></button>
                            </form>
                        </div>
                        {/* form end */}
                    </div>
                </div>
                {/* end */}
            </div>
            {/* Main Container Ends */}

        </div >

    )
}

export default Login