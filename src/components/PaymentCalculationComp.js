import React, { useContext, useState } from 'react';
import Slider from 'react-rangeslider';
import { useForm } from 'react-hook-form';
import AuthContext from '../store/auth-context';

const PaymentCalculationComp = ({ getAmount, getDuration, getMonthly }) => {
    const authCtx = useContext(AuthContext);
    // console.log(authCtx);



    /* payment calculation */
    // const intialAmount = localStorage.getItem('amount');
    // const intialPeriod = localStorage.getItem('period');

    // let numIntialAmount = Number.parseInt(intialAmount);
    // let numIntialPeriod = Number.parseInt(intialPeriod);




    const {
        register,
        // handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "all",
        // mode: "onBlur",
    });



    /* range slider */
    // const [amtSlideValue, setAmtSlideValue] = useState(numIntialAmount);
    // const [periodSlideValue, setPeriodSlideValue] = useState(numIntialPeriod);
    const [amtSlideValue, setAmtSlideValue] = useState(authCtx?.amountSlideValue);
    const [periodSlideValue, setPeriodSlideValue] = useState(authCtx?.periodSlideValue);



    const handleChangeLoan = (value) => {
        // console.log(value);
        setAmtSlideValue(value);
    }

    const handleChangePeriod = (value) => {
        // console.log(value);
        setPeriodSlideValue(value);
    }




    /* Monthly payment interest calculation */
    // function calculateMonthlyPayment() {
    //     let totalInterest = periodSlideValue * 6;
    //     let calculateIntersetAmount = amtSlideValue * (totalInterest / 100);

    //     let totalAmountWithInt = amtSlideValue + calculateIntersetAmount;
    //     let monthlyPayment = (totalAmountWithInt / periodSlideValue).toFixed(2);
    //     let numMonthlyPayment = +monthlyPayment
    //     localStorage.setItem('monthlyPayment', numMonthlyPayment);


    //     setMonthlyPayment(numMonthlyPayment);

    //     if (getMonthly) {
    //         getMonthly(numMonthlyPayment);
    //     }
    // }
    /* Monthly payment interest calculation end */



    /* send calculated value */
    const handleChangeCompleteLoan = () => {
        // console.log('Change event completed Loan', amtSlideValue);
        // if (getAmount) {
        //     getAmount(amtSlideValue);
        // }
        localStorage.setItem('amount', amtSlideValue);

        /* context amount */
        authCtx.createAmountValueFunc(amtSlideValue);
        /* context amount end */

        // calculateMonthlyPayment();
    };

    const handleChangeCompletePeriod = () => {
        // let monthCal = periodSlideValue * 30;
        // if (getDuration) {
        //     getDuration(periodSlideValue);
        // }

        localStorage.setItem('period', periodSlideValue)
        // console.log('Change event completed Period', periodSlideValue);

        /* context period */
        authCtx.createPeriodValueFunc(periodSlideValue);
        /* context period end */

        // calculateMonthlyPayment();
    };
    /* send calculated value */





    const getAmtValue = (value) => {
        let numValue = +value;
        console.log(numValue);
        setAmtSlideValue(numValue);


        // if (getAmount) {
        //     getAmount(numValue);
        // }


        // setTimeout(() => {
        //     calculateMonthlyPayment();
        // }, 1000);
    }

    const getPeriodValue = (value) => {
        let numValue = +value;
        // console.log(numValue);
        setPeriodSlideValue(numValue);


        // if (getDuration) {
        //     getDuration(numValue);
        // }


        // setTimeout(() => {
        //     calculateMonthlyPayment();
        // }, 1000);
    }
    /* range slider end */


    /* payment calculation end */



    return (
        <>
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
                            step={1}
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

            {
                getMonthly &&
                <div className="rnge-total">
                    <h6 className="rnge-total-hdn">Estimated monthly payment</h6>
                    <h6 className="rnge-total-price">£{(authCtx?.numMonthlyPayment).toFixed(2)}</h6>
                </div>
            }
        </>
    )
}

export default PaymentCalculationComp