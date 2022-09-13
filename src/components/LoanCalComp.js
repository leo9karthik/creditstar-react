import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'



const LoanCalComp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "all",
        // mode: "onBlur",
    });


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



    /* range slider */
    const [amtSlideValue, setAmtSlideValue] = useState(1000);
    const [periodSlideValue, setPeriodSlideValue] = useState(12);


    const handleChangeLoan = (value) => {
        // console.log(value);
        setAmtSlideValue(value);
    }

    const handleChangePeriod = (value) => {
        // console.log(value);
        setPeriodSlideValue(value);
    }



    const handleChangeCompleteLoan = () => {
        console.log('Change event completed Loan');
    };

    const handleChangeCompletePeriod = () => {
        console.log('Change event completed Period');
    };



    const getAmtValue = (value) => {
        let numValue = +value;
        // console.log(numValue);
        setAmtSlideValue(numValue);
    }

    const getPeriodValue = (value) => {
        let numValue = +value;
        // console.log(numValue);
        setPeriodSlideValue(numValue);
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
                        <h6 className="rnge-total-price">£171.82</h6>
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