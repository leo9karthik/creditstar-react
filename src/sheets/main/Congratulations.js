import React, { useContext, useState } from 'react'

/* plugin */
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { motion } from "framer-motion";
import moment from 'moment';
/* plugin end */

/* service */
import AuthContext from '../../store/auth-context';
import gs from '../../service/global';
import { stepFun, toasterConfig } from '../../config/Constant';
/* service end */

/* component */
import Header from '../../components/Header'
import ErrorMsgComp from '../../components/ErrorMsgComp';
import InnerBgComp from '../../components/InnerBgComp';
/* component end */

const { REACT_APP_FLOWID, } = process.env;

const Congratulations = () => {
    const authCtx = useContext(AuthContext);
    const instanceId = authCtx?.instanceId;
    const addressDetail = localStorage.getItem('residentialAddress');
    const parseAddressDetail = JSON.parse(addressDetail);
    // console.log(parseAddressDetail?.postcode);
    // console.log(authCtx)

    /* animation */
    const [monthDataAnim] = useAutoAnimate();
    const [specificDayAnim] = useAutoAnimate();

    const [weekAnim] = useAutoAnimate();
    const [payDateAnim] = useAutoAnimate();

    const [repayAnim] = useAutoAnimate();
    /* animation end */

    /* usestate */




    const [getpaid, setGetpaid] = useState(null);
    const [monthly, setMonthly] = useState(null);
    const [specificDay, setSpecificDay] = useState(null);

    const [weekly, setWeekly] = useState(null);
    const [weeklyName, setWeeklyName] = useState(null);
    const [payDate, setPayDate] = useState(null);

    const [repaymentOption, setRepaymentOption] = useState([]);
    const [repaymentScheduleShow, setRepaymentScheduleShow] = useState(false);

    const [congoPayload, setCongoPayload] = useState({});


    const [productUrlValue, setProductUrlValue] = useState('');
    /* usestate end */

    const navigate = useNavigate();

    /* react-form-hook */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });
    /* react-form-hook end */


    /* Select repayment */
    const selectGetpaid = (select) => {
        var value = select.value;
        // console.log(value);
        setGetpaid(value);

    }

    const selectMonthly = (select) => {
        var value = select.value;
        // console.log(value);
        setMonthly(value);


        if (value !== "M-D") {

            /* Loader Starts */
            gs.showLoader(true);
            /* Loader Ends */


            /* Date API */
            let payloadDate = {
                "action": "dates",
                "data": {
                    "repaymentFrequency": value,
                    "postcode": parseAddressDetail?.postcode
                }
            }

            // console.log(payloadDate);
            axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payloadDate)
                .then((response) => {
                    const result = response?.data?.responseData[0];

                    let payload = {
                        "repaymentFrequency": value,
                        "firstRepaymentDate": result,
                    }
                    // console.log(payload);
                    repaymentScheduleFun(payload);
                    setRepaymentScheduleShow(true);
                    const productUrlStr = `&repaymentFrequency=${value}&firstRepaymentDate=${result}`;
                    setProductUrlValue(productUrlStr);
                    // console.log(productUrlStr);


                    /* Loader Starts */
                    gs.showLoader(false);
                    /* Loader Ends */

                })
                .catch((error) => {
                    console.log(error);
                    const errorResult = error?.response?.data?.errors;
                    const arrayOfString = Object.values(errorResult);
                    const arrayFlatten = arrayOfString.flat();
                    // console.log(errorResult);

                    /* Loader Starts */
                    gs.showLoader(false);
                    /* Loader Ends */

                    for (let itemData of arrayFlatten) {
                        // console.log(itemData);

                        toast.error(itemData, toasterConfig);
                    }

                });
            /* Date API end */


        }
    }



    const selectSpecificDay = (select) => {
        var value = select.value;
        // console.log(value);
        setSpecificDay(value);


        /* Loader Starts */
        gs.showLoader(true);
        /* Loader Ends */


        /* Date API */
        let payload = {
            "action": "dates",
            "data": {
                "repaymentFrequency": monthly + value,
                "postcode": parseAddressDetail?.postcode
            }
        }

        // console.log(payload);
        axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data?.responseData[0];

                let payload = {
                    "repaymentFrequency": monthly + value,
                    "firstRepaymentDate": result,
                }
                // console.log(payload);
                repaymentScheduleFun(payload);
                setRepaymentScheduleShow(true);
                const productUrlStr = `&repaymentFrequency=${monthly + value}&firstRepaymentDate=${result}`;
                setProductUrlValue(productUrlStr);
                // console.log(productUrlStr);


                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

            })
            .catch((error) => {
                console.log(error);
                const errorResult = error?.response?.data?.errors;
                const arrayOfString = Object.values(errorResult);
                const arrayFlatten = arrayOfString.flat();
                // console.log(errorResult);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

                for (let itemData of arrayFlatten) {
                    // console.log(itemData);

                    toast.error(itemData, toasterConfig);
                }

            });
        /* Date API end */


    }

    const selectDayWeek = (select) => {
        var value = select.value;

        // console.log(value);
        setWeekly(value);


        var selectedOption = select.options[select.selectedIndex];
        var name = selectedOption.getAttribute('data-name');
        setWeeklyName(name);
        // console.log(name);

        /* Loader Starts */
        gs.showLoader(true);
        /* Loader Ends */

        /* Date API */
        let payload = {
            "action": "dates",
            "data": {
                "repaymentFrequency": value,
                "postcode": parseAddressDetail?.postcode
            }
        }

        // console.log(payload);
        axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data?.responseData;
                // console.log(result);
                setRepaymentOption(result);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

            })
            .catch((error) => {
                console.log(error);
                const errorResult = error?.response?.data?.errors;
                const arrayOfString = Object.values(errorResult);
                const arrayFlatten = arrayOfString.flat();
                // console.log(errorResult);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

                for (let itemData of arrayFlatten) {
                    // console.log(itemData);

                    toast.error(itemData, toasterConfig);
                }

            });
        /* Date API end */


        /* Your next paydate option */
        // var optionDay = select.options[select.selectedIndex].text;
        // const dayINeed = new Date();
        // const today = moment(dayINeed).day(optionDay);
        // const currentWeekDate = moment(today).format('yyyy-MM-DD');
        // // console.log(currentWeekDate);


        // let now = new Date(currentWeekDate);
        // let payDateArr = [];
        // for (let i = 1; i < 5; i++) {
        //     payDateArr.splice(i, 0, moment(now.setDate(now.getDate() + 7)).format('yyyy-MM-DD'));
        // }
        // setRepaymentOption(payDateArr);
        /* Your next paydate option end */
    }

    const selectPayDate = (select) => {
        var value = select.value;
        // console.log(value);
        setPayDate(value);


        let payload = {
            "repaymentFrequency": weekly,
            "firstRepaymentDate": value,
        }
        // console.log(payload);
        repaymentScheduleFun(payload);
        setRepaymentScheduleShow(true);
        const productUrlStr = `&repaymentFrequency=${weekly}&firstRepaymentDate=${value}`;
        setProductUrlValue(productUrlStr);
        // console.log(productUrlStr);

    }



    /* Repayment Schedule function */

    /* product API */
    // useEffect(() => {
    //     // console.log(productUrlValue);
    //     authCtx.productUrlFunc(productUrlValue);

    //     /* Loader Starts */
    //     gs.showLoader(true);
    //     /* Loader Ends */

    //     axios.get(`/offer/product?offerId=${authCtx?.offerData?.name}&amount=${authCtx?.amountSlideValue}&duration=${authCtx?.periodSlideValueMonth}${productUrlValue}`)
    //         .then((response) => {
    //             const result = response?.data;
    //             // console.log(result);
    //             authCtx.paymentDataFunc(result);

    //             if (result?.error) {
    //                 console.log(result?.error);
    //                 const errorText = `${result?.error}, please change the value for Loan amount and Period.`

    //                 toast.error(errorText, toasterConfig);
    //             }
    //             // else {
    //             //     toast.dismiss();
    //             // }

    //             /* Loader Starts */
    //             gs.showLoader(false);
    //             /* Loader Ends */

    //         })
    //         .catch((error) => {
    //             console.log(error);

    //             /* Loader Starts */
    //             gs.showLoader(false);
    //             /* Loader Ends */

    //         });

    // }, [productUrlValue])
    /* product API end */






    const repaymentScheduleFun = (payloadData) => {
        // console.log(payloadData);
        setCongoPayload(payloadData);


        /* Loader Starts */
        gs.showLoader(true);
        /* Loader Ends */


        let payload = {
            "action": "fetch",
            "data": {
                ...payloadData,
                "amount": authCtx?.amountSlideValue,
                "duration": authCtx?.periodSlideValueMonth
            }
        }
        // console.log(payload);

        /* Fetch Data */
        axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data?.responseData;
                // console.log(result);
                // setRepaymentSchedule(result);
                authCtx.paymentDataFunc(result);


                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

            })
            .catch((error) => {
                console.log(error);
                const errorResult = error?.response?.data?.errors;
                const arrayOfString = Object.values(errorResult);
                const arrayFlatten = arrayOfString.flat();
                // console.log(errorResult);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

                for (let itemData of arrayFlatten) {
                    // console.log(itemData);

                    toast.error(itemData, toasterConfig);
                }

            });
        /* Fetch Data end */
    }
    /* Repayment Schedule function end */


    /* Post data */
    const onSubmit = () => {
        // let inputData = data;
        // console.log(inputData);

        let payload = {
            "action": "submit",
            "data": {
                ...congoPayload,
                "amount": authCtx?.amountSlideValue,
                "duration": authCtx?.periodSlideValueMonth
            }
        }
        // console.log(payload);


        /* Loader Starts */
        gs.showLoader(true);
        /* Loader Ends */


        axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data;
                const currentStep = result?.currentStepId;
                navigate(stepFun()[currentStep], { replace: true });
                authCtx.prefilledDataFunc(result?.prefilledData);
                // console.log(currentStep);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

            })
            .catch((error) => {
                const errorEnd = error?.response?.data?.currentStepId;
                navigate(stepFun()[errorEnd], { replace: true });
                console.log(error);
                const errorResult = error?.response?.data?.errors;
                const arrayOfString = Object.values(errorResult);
                const arrayFlatten = arrayOfString.flat();
                // console.log(errorResult);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

                for (let itemData of arrayFlatten) {
                    // console.log(itemData);

                    toast.error(itemData, toasterConfig);
                }

            });



    }
    /* Post data end */

    return (
        <div>

            {/* Header Starts */}
            <Header />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <InnerBgComp classes={"inner-bg-img"} />

                <div className="container">
                    {/* start */}
                    <motion.div
                        initial={{ y: 60, scale: 0.9, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="comm-box congo-checkout">
                        {/* start */}
                        <div className="comm-hdn-slide">
                            <div className="comm-hdn-box">
                                <h3 className="comm-hdn">
                                    Your loan is approved.
                                </h3>
                                <div className="comm-para">
                                    <p>Please review the loan details.</p>
                                </div>
                            </div>
                            <div className="tick-anim">
                                <i className="icon-check" />
                            </div>
                        </div>
                        {/* end */}

                        <form id="congoForm" onSubmit={handleSubmit(onSubmit)} >
                            {/* start */}
                            <div className="checkout-list-box">
                                <div className="check-list check-list-head">
                                    <div className="check-lis-hdn">Loan details</div>
                                </div>

                                <div className="check-list">
                                    <div className="check-lis-hdn">Amount</div>
                                    <p className="check-amount">£{authCtx?.amountSlideValue}</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Period</div>
                                    <p className="check-amount">{authCtx?.periodSlideValue} months</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Monthly payment</div>
                                    <p className="check-amount">£{Number(authCtx?.paymentData?.installmentAmount).toFixed(2)}</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Interest rate (APR)</div>
                                    <p className="check-amount">{Number(authCtx?.paymentData?.aprc * 100).toFixed(2)}%</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Total repayable</div>
                                    <p className="check-amount">£{Number(authCtx?.paymentData?.total).toFixed(2)}</p>
                                </div>


                            </div>
                            {/* end */}


                            <div className="f-row">

                                <div className="w100">
                                    {/* start */}
                                    <div className="form-grp-box">
                                        <div className="form-quest-box">
                                            <h6 className="form-quest">How often do you get paid?</h6>
                                        </div>
                                        <div className="form-grp-field">
                                            <div className="form-grp">
                                                <select
                                                    className="select-field form-field"
                                                    id="getPaid"
                                                    name="getpaid"
                                                    {...register("getpaid", {
                                                        required: "This field is required",
                                                    })}
                                                    onChange={(e) => selectGetpaid(e.target)}
                                                >
                                                    <option value=""></option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="weekly">Every 4 weeks</option>
                                                </select>
                                                {/* <p className="form-label">1st of every month</p> */}
                                            </div>
                                            {errors.getpaid &&
                                                <ErrorMsgComp errorMessage={errors.getpaid.message} />
                                            }
                                            {/* end */}
                                        </div>
                                    </div>
                                    {/* end */}
                                </div>

                                <div className="w100">
                                    {/* start */}
                                    <div ref={monthDataAnim}>
                                        {getpaid === "monthly" && getpaid !== "" ?
                                            <div className="form-grp-box">
                                                <div className="form-quest-box">
                                                    <h6 className="form-quest">Choose Frequency</h6>
                                                </div>
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <select
                                                            className="select-field form-field emptyField"
                                                            id="chooseFrequency"
                                                            name="chooseFrequency"
                                                            {...register("chooseFrequency", {
                                                                required: "Choose Frequency is required",
                                                            })}
                                                            onChange={(e) => selectMonthly(e.target)}
                                                        >
                                                            <option value=""></option>
                                                            <option value="M-D" data-name="specificmonth">Specific day of month</option>
                                                            <option value="M-LWD" data-name="monthstatic">Last working day of month</option>
                                                            <option value="M-1" data-name="monthstatic">Last Monday of the month</option>
                                                            <option value="M-2" data-name="monthstatic">Last Tuesday of the month</option>
                                                            <option value="M-3" data-name="monthstatic">Last Wednesday of the month</option>
                                                            <option value="M-4" data-name="monthstatic">Last Thursday of the month</option>
                                                            <option value="M-5" data-name="monthstatic">Last Friday of the month</option>
                                                        </select>
                                                        {/* <p className="form-label">1st of every month</p> */}
                                                    </div>
                                                    {errors.chooseFrequency &&
                                                        <ErrorMsgComp errorMessage={errors.chooseFrequency.message} />
                                                    }
                                                    {/* end */}
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    {/* end */}
                                </div>

                                <div className="w100">
                                    {/* start */}
                                    <div ref={specificDayAnim}>
                                        {monthly === "M-D" && getpaid !== "weekly" && getpaid !== "" ?
                                            <div className="form-grp-box">
                                                <div className="form-quest-box">
                                                    <h6 className="form-quest">Choose specific date</h6>
                                                </div>
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <select
                                                            className="select-field form-field"
                                                            id="chooseDate"
                                                            name="chooseDate"
                                                            {...register("chooseDate", {
                                                                required: "Choose specific date is required",
                                                            })}
                                                            onChange={(e) => selectSpecificDay(e.target)}
                                                        >
                                                            <option value=""></option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                            <option value="24">24</option>
                                                            <option value="25">25</option>
                                                            <option value="26">26</option>
                                                            <option value="27">27</option>
                                                            <option value="28">28</option>
                                                            <option value="29">29</option>
                                                            <option value="30">30</option>
                                                            <option value="31">31</option>
                                                        </select>
                                                        {/* <p className="form-label">1st of every month</p> */}
                                                    </div>
                                                    {(errors.chooseDate && specificDay === "") &&
                                                        <ErrorMsgComp errorMessage={errors.chooseDate.message} />
                                                    }
                                                    {/* end */}
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    {/* end */}
                                </div>

                                <div className="w50">
                                    {/* start */}
                                    <div ref={weekAnim}>
                                        {getpaid === "weekly" && getpaid !== "" ?
                                            <div className="form-grp-box">
                                                <h6 className="form-quest">Day of week</h6>
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <select
                                                            className="select-field form-field emptyField"
                                                            id="dayWeek"
                                                            name="dayWeek"
                                                            {...register("dayWeek", {
                                                                required: "Day of Week is required",
                                                            })}
                                                            onChange={(e) => selectDayWeek(e.target)}
                                                        >
                                                            <option value=""></option>
                                                            <option value="4W-1" data-name="weekstatic">Monday</option>
                                                            <option value="4W-2" data-name="weekstatic">Tuesday</option>
                                                            <option value="4W-3" data-name="weekstatic">Wednesday</option>
                                                            <option value="4W-4" data-name="weekstatic">Thursday</option>
                                                            <option value="4W-5" data-name="weekstatic">Friday</option>
                                                        </select>
                                                        {/* <p className="form-label">1st of every month</p> */}
                                                    </div>
                                                    {errors.dayWeek &&
                                                        <ErrorMsgComp errorMessage={errors.dayWeek.message} />
                                                    }
                                                    {/* end */}
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    {/* end */}
                                </div>

                                <div className="w50">
                                    {/* start */}
                                    <div ref={payDateAnim}>
                                        {weeklyName === "weekstatic" && getpaid !== "monthly" && getpaid !== "" ?
                                            <div className="form-grp-box">
                                                <h6 className="form-quest">Your next Paydate</h6>
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <select
                                                            className="select-field form-field emptyField"
                                                            id="paydate"
                                                            name="paydate"
                                                            {...register("paydate", {
                                                                required: "Pay date is required",
                                                            })}
                                                            onChange={(e) => selectPayDate(e.target)}
                                                        >
                                                            <option value=""></option>
                                                            {repaymentOption ? repaymentOption.map(item => (
                                                                <option key={item} value={item}>{moment(item).format('DD MMM yyyy')}</option>
                                                            )) : null}
                                                        </select>
                                                    </div>
                                                    {(errors.paydate && payDate === "") &&
                                                        <ErrorMsgComp errorMessage={errors.paydate.message} />
                                                    }
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    {/* end */}
                                </div>

                            </div>

                            <div ref={repayAnim}>
                                {repaymentScheduleShow ?
                                    <div className="form-grp-box">
                                        <h6 className="form-quest">Repayment schedule</h6>

                                        <div className="f-row f-2 f-480-1 repay-list congo-repay-list">

                                            {authCtx?.paymentData?.installments?.map(item => (
                                                <div className="f-col" key={item?.nr}>
                                                    <div className="check-list">
                                                        <div className="check-lis-hdn"><b>{item?.nr}.</b> {moment(item?.dueDate).format('ddd, Do MMM YYYY')}</div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                            {/* end */}

                            <div className="comm-disclaim">
                                <p>
                                    Amount of credit £900 over 12 months. Interest £398.81. Interest rate 73% pa (fixed), 0.2% per
                                    day of the amount borrowed. Repay with 12 equal instalments of £108.23. Total amount payable
                                    1298.81. Representative 100.96%.
                                </p>
                            </div>
                            <button className="button button--block">Confirm</button>
                        </form>

                    </motion.div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default Congratulations