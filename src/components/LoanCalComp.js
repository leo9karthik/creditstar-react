import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-rangeslider/lib/index.css'
import { toast } from 'react-toastify';
import AuthContext from '../store/auth-context';
import PaymentCalculationComp from './PaymentCalculationComp';

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

    const {
        // register,
        handleSubmit,
        // formState: { errors }
    } = useForm({
        mode: "all",
        // mode: "onBlur",
    });


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


                    <PaymentCalculationComp getAmount={getAmount} getDuration={getDuration} getMonthly={getMonthly} />

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