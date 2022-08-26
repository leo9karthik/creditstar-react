import React, { useEffect } from 'react'
import Header from '../../../components/Header'
import LoanCalComp from '../../../components/LoanCalComp'
import MontlyPaymentComp from '../../../components/MontlyPaymentComp'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_PUBLIC_URL } = process.env;

const WelcomeStep2_1 = () => {

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

        navigate("/welcome-step3", { replace: true });
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
                                <div className="addr-main-box">
                                    <div className="addr-card">
                                        {/* <h5 class="addr-hdn">Current address</h5> */}
                                        <h5 className="form-quest">Current address</h5>
                                        {/* start */}
                                        <div className="addr-box">
                                            <div className="addr-hdn-cross">
                                                <h6 className="addr-cont-hdn">34 Waltham Road, Bournemouth, BH7 6PF</h6>
                                                <div className="addr-ico">
                                                    <i className="icon-close" />
                                                </div>
                                            </div>
                                            <div className="addr-cont-owner">
                                                <p className="addr-owner">Homeowner</p>
                                                <a href="#" className="comm-link">Change</a>
                                            </div>
                                        </div>
                                        {/* end */}
                                    </div>
                                </div>
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
                                                        id="select-fld"
                                                        name="month"
                                                        {...register("month", {
                                                            required: "Month is required",
                                                        })}

                                                    >
                                                        <option></option>
                                                        <option>Option 1</option>
                                                        <option>Option 2</option>
                                                        <option>Option 3</option>
                                                        <option>Option 4</option>
                                                        <option>Option 5</option>
                                                    </select>
                                                    <p className="form-label">Month</p>
                                                </div>
                                                {errors.month &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.month.message}</p>
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
                                                        id="select-fld"
                                                        name="year"
                                                        {...register("year", {
                                                            required: "Year is required",
                                                        })}
                                                    >
                                                        <option />
                                                        <option>Option 1</option>
                                                        <option>Option 2</option>
                                                        <option>Option 3</option>
                                                        <option>Option 4</option>
                                                        <option>Option 5</option>
                                                    </select>
                                                    <p className="form-label">Year</p>
                                                </div>
                                                {errors.year &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.year.message}</p>
                                                    </div>
                                                }
                                            </div>
                                            {/* end */}
                                        </div>
                                    </div>
                                </div>
                                {/* end */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">What’s your residential status?</p>
                                        <div className="mob-full-chk">
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    id="homeowner"
                                                    name="residstatus"
                                                    {...register("homeowner")}
                                                />
                                                <label className="chk-label" htmlFor="homeowner">
                                                    <span> Home owner </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    id="privatetenant"
                                                    name="residstatus"
                                                    {...register("privatetenant")}
                                                />
                                                <label className="chk-label" htmlFor="privatetenant">
                                                    <span> Private tenant </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    id="living"
                                                    name="residstatus"
                                                    {...register("living")}
                                                />
                                                <label className="chk-label" htmlFor="living">
                                                    <span> Living with parents </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    id="counciltenant"
                                                    name="residstatus"
                                                    {...register("counciltenant")}
                                                />
                                                <label className="chk-label" htmlFor="counciltenant">
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

export default WelcomeStep2_1