import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../../../components/Header'
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';
import AuthContext from '../../../store/auth-context';
import axios from 'axios';
import gs from '../../../service/global';
import { toast } from 'react-toastify';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const Welcome = () => {
    const authCtx = useContext(AuthContext);
    console.log("welcomejs:", authCtx);
    var instanceId = authCtx?.instanceId;
    const navigate = useNavigate();
    // console.log(authCtx?.amountSlideValue,authCtx?.periodSlideValue);

    /* react-form-hook */
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });
    /* react-form-hook end */

    /* usestate */
    const [welcomeRadio, setWelcomeRadio] = useState('homeImprovement');
    const [termRadio, setTermRadio] = useState(false);
    /* usestate end */

    /* Post data */
    const onSubmit = () => {
        // console.log(data);

        let payload = {
            "action": "submit",
            "data": {
                "loanPurpose": welcomeRadio,
                "termsAndPrivacyConsent": termRadio,
                "amount": authCtx?.amountSlideValue,
                "duration": authCtx?.periodSlideValue,
            }
        }
        console.log(payload);


        /* Loader Starts */
        gs.showLoader(true);
        /* Loader Ends */


        axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data;
                authCtx.currentStepFunc(result?.currentStepId);
                console.log(result);


                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */


                // redirect to Basic Info
                navigate("/basic-info", { replace: true });
            })
            .catch((error) => {
                console.log(error);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

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
    /* Post data end */



    /* get radio */
    const welcomeRadioFun = (value) => {
        console.log(value);
        setWelcomeRadio(value);
    }

    const termRadioFun = (value) => {
        console.log(value);
        setTermRadio(value);
    }
    /* get radio end */




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
                            <div className="comm-box ">
                                <div className="comm-hdn-box">
                                    <h3 className="comm-hdn">
                                        Welcome!
                                    </h3>
                                    <div className="comm-para">
                                        <p>To get started, tell us about the purpose of loan.</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="wel-check-box mob-full-chk">
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                name="welcomeRadio"
                                                id="homeImprovement"
                                                value="homeImprovement"
                                                defaultChecked={welcomeRadio === 'homeImprovement'}
                                                onClick={(e) => welcomeRadioFun(e.target.value)}
                                            />
                                            <label className="chk-label" htmlFor="homeImprovement">
                                                <span> Home improvement </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                name="welcomeRadio"
                                                id="car"
                                                value="car"
                                                defaultChecked={welcomeRadio === 'car'}
                                                onClick={(e) => welcomeRadioFun(e.target.value)}
                                            />
                                            <label className="chk-label" htmlFor="car">
                                                <span> Car </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                name="welcomeRadio"
                                                id="debtConsolidation"
                                                value="debtConsolidation"
                                                defaultChecked={welcomeRadio === 'debtConsolidation'}
                                                onClick={(e) => welcomeRadioFun(e.target.value)}
                                            />
                                            <label className="chk-label" htmlFor="debtConsolidation">
                                                <span> Debt consolidation </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                name="welcomeRadio"
                                                id="other"
                                                value="other"
                                                defaultChecked={welcomeRadio === 'other'}
                                                onClick={(e) => welcomeRadioFun(e.target.value)}
                                            />
                                            <label className="chk-label" htmlFor="other">
                                                <span> Other </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                    </div>
                                    <div className="checkbox-box term-chk wel-chk">
                                        <input type="checkbox"
                                            name="termRadio"
                                            id="term"
                                            // value={termRadio}
                                            defaultChecked={termRadio}
                                            onClick={(e) => termRadioFun(e.target.checked)}
                                        />
                                        <label className="chk-label" htmlFor="term">
                                            I have read and agree with the
                                            <a href="#">terms & privacy</a>
                                            and to receive Credistar updates and offers.
                                        </label>
                                    </div>
                                    {/* [disabled] */}
                                    <button className="button button--block">Get started</button>
                                </form>
                            </div>
                            {/* end */}
                        </div>
                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}

        </div >

    )
}

export default Welcome