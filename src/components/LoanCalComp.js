import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { toast } from 'react-toastify';
import AuthContext from '../store/auth-context';

const { REACT_APP_FLOWID } = process.env;

const LoanCalComp = ({ getAmount, getDuration, getMonthly }) => {
    const authCtx = useContext(AuthContext);
    var instanceId = authCtx?.instanceId;
    // console.log(instanceId);


    /* loan calculator add remove class */
    const openCalculatorFn = () => {
        // console.log("clicked On openCalculatorFn!");

        document.querySelector(".yourloan").classList.add("show");
        document.querySelector(".card-main-amt").classList.add("dnone");
    }

    const closeCalculatorFn = () => {
        // console.log("clicked On closeCalculatorFn!");

        document.querySelector(".yourloan").classList.remove("show");
        document.querySelector(".card-main-amt").classList.remove("dnone");
    }
    /* loan calculator add remove class end */




    const intialAmount = localStorage.getItem('amount');
    const intialPeriod = localStorage.getItem('period');

    const intialMonthlyPayment = localStorage.getItem('monthlyPayment');

    let numIntialAmount = Number.parseInt(intialAmount);
    let numIntialPeriod = Number.parseInt(intialPeriod);

    let daysToMonths = numIntialPeriod / 30;
    // console.log(numIntialAmount, numIntialPeriod);


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "all",
        // mode: "onBlur",
    });



    /* range slider */
    const [amtSlideValue, setAmtSlideValue] = useState(numIntialAmount);
    const [periodSlideValue, setPeriodSlideValue] = useState(daysToMonths);

    const [monthlyPaymentValue, setMonthlyPayment] = useState(intialMonthlyPayment);


    const handleChangeLoan = (value) => {
        // console.log(value);
        setAmtSlideValue(value);
    }

    const handleChangePeriod = (value) => {
        // console.log(value);
        setPeriodSlideValue(value);
    }




    /* Monthly payment interest calculation */
    function calculateMonthlyPayment() {
        let totalInterest = periodSlideValue * 6;
        let calculateIntersetAmout = amtSlideValue * (totalInterest / 100);

        let totalAmountWithInt = amtSlideValue + calculateIntersetAmout;
        let monthlyPayment = (totalAmountWithInt / periodSlideValue).toFixed(2);
        let numMonthlyPayment = +monthlyPayment
        localStorage.setItem('monthlyPayment', numMonthlyPayment);

        // console.log({
        //     periodSlideValue, amtSlideValue,totalInterest, calculateIntersetAmout, totalAmountWithInt, numMonthlyPayment
        // });

        setMonthlyPayment(numMonthlyPayment);
        getMonthly(numMonthlyPayment);
    }
    /* Monthly payment interest calculation end */



    /* send calculated value */
    const handleChangeCompleteLoan = () => {
        // console.log('Change event completed Loan', amtSlideValue);
        getAmount(amtSlideValue);
        localStorage.setItem('amount', amtSlideValue);

        calculateMonthlyPayment();

        let payload = {
            "action": "submit",
            "data": {
                "amount": amtSlideValue,
                "duration": periodSlideValue
            }
        }
        // console.log(payload);
        getPayload(payload);
    };

    const handleChangeCompletePeriod = () => {
        let monthCal = periodSlideValue * 30;
        getDuration(periodSlideValue);
        localStorage.setItem('period', monthCal)
        // console.log('Change event completed Period', periodSlideValue);

        calculateMonthlyPayment();

        let payload = {
            "action": "submit",
            "data": {
                "amount": amtSlideValue,
                "duration": monthCal
            }
        }
        // console.log(payload);
        getPayload(payload);
    };

    function getPayload(payload) {
        // console.log(payload);

        // axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
        //     .then((response) => {
        //         const result = response?.data;
        //         // authCtx.currentStepFunc(result?.currentStepId);
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

    /* send calculated value */





    const getAmtValue = (value) => {
        let numValue = +value;
        // console.log(numValue);
        setAmtSlideValue(numValue);

        setTimeout(() => {
            calculateMonthlyPayment();
        }, 1000);
    }

    const getPeriodValue = (value) => {
        let numValue = +value;
        // console.log(numValue);
        setPeriodSlideValue(numValue);

        setTimeout(() => {
            calculateMonthlyPayment();
        }, 1000);
    }
    /* range slider end */



    /* submit data */
    const onSubmit = (data) => {
        console.log(data);
    }
    /* submit data end */

    return (
        <div className="comm-box wel-loan">

            <div className="card-main-amt">
                <div className="card-amt-flex">
                    <div className="card-amt">
                        <h6>Loan amount</h6>
                        <p>£2500</p>
                    </div>
                    <div className="card-amt">
                        <h6>Period</h6>
                        <p>18 months</p>
                    </div>
                    <div className="card-amt">
                        <h6>Estimated payment</h6>
                        <p>£171.82 /mo</p>
                    </div>
                </div>
                <div className="card-amt-icon cur-point" onClick={() => openCalculatorFn()}>
                    <i className="icon-pencil" />
                </div>
            </div>

            <div className="yourloan">
                <div className="comm-hdn-cross">
                    <h3 className="comm-hdn">
                        Your loan
                    </h3>
                    <div className="loan-cross cur-point" onClick={() => closeCalculatorFn()}>
                        <i className="icon-close" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="rnge-slide-box">
                        <div className="rnge-slide">
                            <div className="rnge-top">
                                <h6 className="rnge-hdn">Loan amount</h6>
                                <div className="form-grp form-inp-txt amt-slider">
                                    <input
                                        className="form-field"
                                        type="number"
                                        min="500"
                                        max="5000"
                                        id="amount"
                                        name="amount"
                                        value={amtSlideValue}
                                        autoComplete="off"

                                        {...register("amount", {
                                            required: "Amount is required",
                                            min: {
                                                value: 500,
                                                message: "The value should not go below 500"
                                            },
                                            max: {
                                                value: 5000,
                                                message: "The value should not go above 5000"
                                            }
                                        })}

                                        onChange={(e) => getAmtValue(e.target.value)}
                                    />
                                    {/* <p class="form-label">First Name</p> */}
                                    <em>£</em>
                                </div>
                            </div>
                            <div className="drag-slide">

                                <Slider
                                    min={500}
                                    max={5000}
                                    value={amtSlideValue}
                                    tooltip={false}
                                    onChange={handleChangeLoan}
                                    onChangeComplete={handleChangeCompleteLoan}
                                />


                            </div>
                            <div className="rnge-btm">
                                <p>£500</p>
                                <p>£5000</p>
                            </div>
                            {errors.amount &&
                                <div className="form-input-error">
                                    <i className="icon-input-error"></i>
                                    <p>{errors.amount.message}</p>
                                </div>
                            }
                        </div>
                        <div className="rnge-slide">
                            <div className="rnge-top">
                                <h6 className="rnge-hdn">Period</h6>
                                <div className="form-grp amt-slider">
                                    <input
                                        className="form-field"
                                        type="number"
                                        min="6"
                                        max="18"
                                        id="period"
                                        name="period"
                                        value={periodSlideValue}
                                        autoComplete="off"

                                        {...register("period", {
                                            required: "Period is required",
                                            min: {
                                                value: 6,
                                                message: "The value should not go below 6"
                                            },
                                            max: {
                                                value: 18,
                                                message: "The value should not go above 18"
                                            }
                                        })}

                                        onChange={(e) => getPeriodValue(e.target.value)}

                                    />
                                    {/* <p class="form-label">First Name</p> */}
                                </div>
                            </div>
                            <div className="drag-slide">

                                <Slider
                                    min={6}
                                    max={18}
                                    value={periodSlideValue}
                                    tooltip={false}
                                    onChange={handleChangePeriod}
                                    onChangeComplete={handleChangeCompletePeriod}
                                />

                            </div>
                            <div className="rnge-btm">
                                <p>6 months</p>
                                <p>18 months</p>
                            </div>
                            {errors.period &&
                                <div className="form-input-error">
                                    <i className="icon-input-error"></i>
                                    <p>{errors.period.message}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="rnge-total">
                        <h6 className="rnge-total-hdn">Estimated monthly payment</h6>
                        <h6 className="rnge-total-price">£{monthlyPaymentValue}</h6>
                    </div>
                    <div className="comm-disclaim mb0">
                        <p>
                            Amount of credit £900 over 12 months. Interest £398.81. Interest rate 73% pa
                            (fixed),
                            0.2% per day of the amount borrowed. Repay with 12 equal instalments of £108.23.
                            Total
                            amount payable 1298.81. Representative 100.96%.
                        </p>
                    </div>
                    <button className="button button--block loan-amt-btn">Save</button>
                </form>
            </div>

        </div>

    )
}

export default LoanCalComp