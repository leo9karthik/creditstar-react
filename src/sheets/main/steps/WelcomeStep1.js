import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header'
import LoanCalComp from '../../../components/LoanCalComp'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../store/auth-context';
import { toast } from 'react-toastify';
import gs from '../../../service/global';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const WelcomeStep1 = () => {
    const authCtx = useContext(AuthContext);
    var instanceId = authCtx?.instanceId;
    // console.log(instanceId);


    /* steps */
    const [steps, setSteps] = useState(0);
    setTimeout(() => {
        setSteps(1)
    }, 1000);
    let percentage = (steps / 4) * 100;
    /* steps end */

    /* usestate */
    const [titleRadio, setTitleRadio] = useState('mr');
    const [dependentRadio, setDependentRadio] = useState('one');
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
    /* react-form-hook end */

    /* get radio */
    const titleRadioFun = (value) => {
        console.log(value);
        setTitleRadio(value);
    }

    const dependentRadioFun = (value) => {
        console.log(value);
        setDependentRadio(value);
    }
    /* get radio end */

    /* Post data */
    const onSubmit = (data) => {
        let inputData = data;
        console.log(inputData);

        const dobValue = `${inputData?.yybirth}-${inputData?.mmbirth}-${inputData?.ddbirth}`;
        console.log(dobValue);

        let payload = {
            "action": "submit",
            "data": {
                "email": inputData?.emailaddress,
                "title": titleRadio,
                "firstName": inputData?.firstname,
                "lastName": inputData?.lastname,
                "dateOfBirth": dobValue
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


                // redirect to Address History 
                navigate("/address-lookup", { replace: true });
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
                                            About you
                                        </h3>
                                        <div className="comm-para">
                                            <p>Tells us about yourself</p>
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
                                        <p className="form-quest rm-for-mob">What’s your email?</p>
                                        <div className="form-grp-field">
                                            <div className="form-grp">
                                                <input
                                                    className="form-field"
                                                    type="email"
                                                    id="emailaddress"
                                                    name="emailaddress"
                                                    {...register("emailaddress", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                                                            message: "Enter a valid Email"
                                                        }
                                                    })}
                                                />
                                                <p className="form-label">Email address</p>
                                            </div>
                                            {errors.emailaddress &&
                                                <div className="form-input-error">
                                                    <i className="icon-input-error"></i>
                                                    <p>{errors.emailaddress.message}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {/* end */}


                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest rm-for-mob">What’s your title?</p>
                                        <div className="title-chk">
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="titleradio"
                                                    id="mr"
                                                    value="mr"
                                                    defaultChecked={titleRadio === 'mr'}
                                                    onClick={(e) => titleRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="mr">
                                                    <span> Mr </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    id="ms"
                                                    name="titleradio"
                                                    value="ms"
                                                    defaultChecked={titleRadio === 'ms'}
                                                    onClick={(e) => titleRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="ms">
                                                    <span> Ms </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    id="miss"
                                                    name="titleradio"
                                                    value="miss"
                                                    defaultChecked={titleRadio === 'miss'}
                                                    onClick={(e) => titleRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="miss">
                                                    <span> Miss </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    id="mrs"
                                                    name="titleradio"
                                                    value="mrs"
                                                    defaultChecked={titleRadio === 'mrs'}
                                                    onClick={(e) => titleRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="mrs">
                                                    <span> Mrs </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                        </div>
                                        {errors.titleradio?.type === 'required' &&
                                            <div className="form-input-error">
                                                <i className="icon-input-error"></i>
                                                <p>Title is required</p>
                                            </div>
                                        }
                                    </div>
                                    {/* end */}

                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest rm-for-mob">What’s your name?</p>
                                        <div className="multi-form-field mb0">
                                            <div className="form-grp-field">
                                                <div className="form-grp">
                                                    <input
                                                        className="form-field"
                                                        type="text"
                                                        id="firstname"
                                                        name="firstname"
                                                        {...register("firstname", {
                                                            required: "First name is required"
                                                        })}
                                                    />
                                                    <p className="form-label">First name</p>
                                                </div>
                                                {errors.firstname &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.firstname.message}</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className="form-grp-field">
                                                <div className="form-grp">
                                                    <input
                                                        className="form-field"
                                                        type="text"
                                                        id="lastname"
                                                        name="lastname"
                                                        {...register("lastname", {
                                                            required: "Last name is required"
                                                        })}
                                                    />
                                                    <p className="form-label">Last name</p>
                                                </div>
                                                {errors.lastname &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.lastname.message}</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/* end */}



                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">Date of birth</p>
                                        <div className="f-row custm-frow">
                                            <div className="w25">
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <input
                                                            className="form-field"
                                                            type="number"
                                                            id="ddbirth"
                                                            name="ddbirth"
                                                            {...register("ddbirth", {
                                                                required: "Date is required"
                                                            })}
                                                        />
                                                        <p className="form-label">DD</p>
                                                    </div>
                                                    {/* {errors.ddbirth &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors.ddbirth.message}</p>
                                                        </div>
                                                    } */}
                                                </div>
                                            </div>
                                            <div className="w25">
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <input
                                                            className="form-field"
                                                            type="number"
                                                            id="mmbirth"
                                                            name="mmbirth"
                                                            {...register("mmbirth", {
                                                                required: "Date is required"
                                                            })}
                                                        />
                                                        <p className="form-label">MM</p>
                                                    </div>
                                                    {/* {errors.mmbirth &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors.mmbirth.message}</p>
                                                        </div>
                                                    } */}
                                                </div>
                                            </div>
                                            <div className="w50">
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <input
                                                            className="form-field"
                                                            type="number"
                                                            id="yybirth"
                                                            name="yybirth"
                                                            {...register("yybirth", {
                                                                required: "Year is required"
                                                            })}
                                                        />
                                                        <p className="form-label">YYYY</p>
                                                    </div>
                                                    {/* {errors.yybirth &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors.yybirth.message}</p>
                                                        </div>
                                                    } */}
                                                </div>
                                            </div>
                                        </div>
                                        {(errors.ddbirth || errors.mmbirth || errors.yybirth) &&
                                            <div className="form-input-error">
                                                <i className="icon-input-error"></i>
                                                <p>Date of birth is required</p>
                                            </div>
                                        }
                                    </div>
                                    {/* end */}

                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">Number of dependents ?</p>
                                        <div className="title-chk">
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="dependents"
                                                    id="one"
                                                    value="one"
                                                    defaultChecked={dependentRadio === 'one'}
                                                    onClick={(e) => dependentRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="one">
                                                    <span> 1 </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="dependents"
                                                    id="two"
                                                    value="two"
                                                    defaultChecked={dependentRadio === 'two'}
                                                    onClick={(e) => dependentRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="two">
                                                    <span> 2 </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="dependents"
                                                    id="three"
                                                    value="three"
                                                    defaultChecked={dependentRadio === 'three'}
                                                    onClick={(e) => dependentRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="three">
                                                    <span> 3 </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="dependents"
                                                    id="four"
                                                    value="four"
                                                    defaultChecked={dependentRadio === 'four'}
                                                    onClick={(e) => dependentRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="four">
                                                    <span> 4+ </span>
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

export default WelcomeStep1
