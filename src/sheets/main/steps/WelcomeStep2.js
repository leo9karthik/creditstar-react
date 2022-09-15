import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header';
import LoanCalComp from '../../../components/LoanCalComp';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import axios from 'axios';
import { toast } from 'react-toastify';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const WelcomeStep2 = () => {
    const authCtx = useContext(AuthContext);
    var instanceId = authCtx?.instanceId;
    // console.log(instanceId);


    /* steps */
    const [steps, setSteps] = useState(1);
    setTimeout(() => {
        setSteps(2)
    }, 1000);
    let percentage = (steps / 4) * 100;
    /* steps end */


    /* usestate */
    const [residentialRadio, setResidentialRadio] = useState('homeOwner');
    /* usestate end */


    const navigate = useNavigate();

    /* react-form-hook */
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });
    /* react-form-hook end */

    /* Post data */
    const onSubmit = (data) => {
        let inputData = data;
        // console.log(inputData?.postcode);

        let payload = {
            "action": "submit",
            "data": {
                "postcode": inputData?.postcode
            }
        }
        console.log(payload);


        // axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
        //     .then((response) => {
        //         const result = response?.data;
        //         authCtx.currentStepFunc(result?.currentStepId);
        //         console.log(result);

        //     })
        //     .catch((error) => {
        //         console.log(error);

        //         toast.error('Something went wrong!', {
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });

        //     });

    }

    const onSubmitAddress = (data) => {
        let inputData = data;
        // console.log(inputData);

        let payload = {
            "action": "submit",
            "data": {
                "address": inputData?.address,
                "residentialStatus": residentialRadio
            }
        }
        console.log(payload);


        // axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
        //     .then((response) => {
        //         const result = response?.data;
        //         authCtx.currentStepFunc(result?.currentStepId);
        //         console.log(result);

        //         // // redirect to Address Lookup 
        //         // navigate("/welcome-step2-1", { replace: true });
        //     })
        //     .catch((error) => {
        //         console.log(error);

        //         toast.error('Something went wrong!', {
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });

        //     });

    }
    /* Post data end */



    /* get radio data */
    const residentialRadioFun = (value) => {
        console.log(value);
        setResidentialRadio(value);
    }

    /* get radio data end */

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
                                </form>

                                <form onSubmit={handleSubmit2(onSubmitAddress)}>
                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">Select your address</p>
                                        <div className="form-grp-field mb0">
                                            <div className="form-grp">
                                                <select className="select-field form-field"
                                                    id="address-fld"
                                                    name="address"
                                                    {...register2("address", {
                                                        required: "Address is required",
                                                    })}
                                                >
                                                    <option />
                                                    <option value="address1">32 Waltham Road, Bournemouth... 1</option>
                                                    <option value="address2">32 Waltham Road, Bournemouth... 2</option>
                                                    <option value="address3">32 Waltham Road, Bournemouth... 3</option>
                                                    <option value="address4">32 Waltham Road, Bournemouth... 4</option>
                                                    <option value="address5">32 Waltham Road, Bournemouth... 5</option>
                                                </select>
                                                <p className="form-label">Select Address</p>
                                            </div>
                                            {errors2.year &&
                                                <div className="form-input-error">
                                                    <i className="icon-input-error"></i>
                                                    <p>{errors2.address.message}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {/* end */}
                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">When did you move in?</p>
                                        <div className="f-row f-2 custm-frow">
                                            <div className="f-col">
                                                {/* start */}
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <select
                                                            className="select-field form-field"
                                                            id="month-fld"
                                                            name="month"
                                                            {...register2("month", {
                                                                required: "Month is required",
                                                            })}
                                                        >
                                                            <option></option>
                                                            <option value="month1">Option 1</option>
                                                            <option value="month2">Option 2</option>
                                                            <option value="month3">Option 3</option>
                                                            <option value="month4">Option 4</option>
                                                            <option value="month5">Option 5</option>
                                                        </select>
                                                        <p className="form-label">Month</p>
                                                    </div>
                                                    {errors2.month &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors2.month.message}</p>
                                                        </div>
                                                    }
                                                </div>
                                                {/* end */}
                                            </div>
                                            <div className="f-col">
                                                {/* start */}
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <select
                                                            className="select-field form-field"
                                                            id="year-fld"
                                                            name="year"
                                                            {...register2("year", {
                                                                required: "Year is required",
                                                            })}

                                                        >
                                                            <option />
                                                            <option value="year1">Option 1</option>
                                                            <option value="year2">Option 2</option>
                                                            <option value="year3">Option 3</option>
                                                            <option value="year4">Option 4</option>
                                                            <option value="year5">Option 5</option>
                                                        </select>
                                                        <p className="form-label">Year</p>
                                                    </div>
                                                    {errors2.year &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors2.year.message}</p>
                                                        </div>
                                                    }
                                                </div>
                                                {/* end */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* end */}
                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">What’s your residential status?</p>
                                        <div className="mob-full-chk">
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="homeOwner"
                                                    value="homeOwner"
                                                    defaultChecked={residentialRadio === 'homeOwner'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="homeOwner">
                                                    <span> Home owner </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="privateTenant"
                                                    value="privateTenant"
                                                    defaultChecked={residentialRadio === 'privateTenant'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="privateTenant">
                                                    <span> Private tenant </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="livingWithParent"
                                                    value="livingWithParent"
                                                    defaultChecked={residentialRadio === 'livingWithParent'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="livingWithParent">
                                                    <span> Living with parents </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="councilTenant"
                                                    value="councilTenant"
                                                    defaultChecked={residentialRadio === 'councilTenant'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="councilTenant">
                                                    <span> Council tenant </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                        </div>
                                    </div>
                                    {/* end */}
                                    {/* [disabled] */}
                                    <button className="button button--block">Continue</button>
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
