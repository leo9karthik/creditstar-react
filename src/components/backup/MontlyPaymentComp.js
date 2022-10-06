import React, { useState } from 'react'
import LoanCalComp from '../LoanCalComp';

const { REACT_APP_PUBLIC_URL } = process.env;

const MontlyPaymentComp = () => {
    const numIntialAmount = localStorage.getItem('amount');
    const numIntialPeriod = localStorage.getItem('period');
    const intialMonthlyPayment = localStorage.getItem('monthlyPayment');


    let daysToMonths = numIntialPeriod / 30;
    // console.log(intialAmount, intialPeriod);


    const [amountData, setAmountData] = useState(numIntialAmount)
    const [durationData, setDurationData] = useState(daysToMonths)
    const [monthlyData, setMonthlyData] = useState(intialMonthlyPayment)

    /* our call back function */
    const getAmount = (value) => {
        // console.log(value);
        setAmountData(value);
    }

    const getDuration = (value) => {
        // console.log(value);
        setDurationData(value);
    }

    const getMonthly = (value) => {
        // console.log(value);
        setMonthlyData(value);
    }
    /* our call back function end */

    return (
        <>
            <div className="welcome-pay">
                <div className="wel-img">
                    <img src={`${REACT_APP_PUBLIC_URL}/img/payment-bg.png`} alt="" />
                </div>
                <div className="wel-cont-box">
                    <div className="wel-mont-pay">
                        <h5 className="wel-hdn">Monthly payment</h5>
                        <h6 className="wel-pay-val">£{monthlyData}</h6>
                    </div>
                    <div className="wel-flex">
                        {/* start */}
                        <div className="wel-period">
                            <div className="wel-icon">
                                <i className="icon-loan-amount" />
                            </div>
                            <div className="wel-per-cont">
                                <h5 className="wel-per-hdn">Loan amount</h5>
                                <h6 className="wel-per-price">£ {amountData}</h6>
                            </div>
                        </div>
                        {/* end */}
                        {/* start */}
                        <div className="wel-period">
                            <div className="wel-icon">
                                <i className="icon-calender" />
                            </div>
                            <div className="wel-per-cont">
                                <h5 className="wel-per-hdn">Period</h5>
                                <h6 className="wel-per-price">{durationData} months</h6>
                            </div>
                        </div>
                        {/* end */}
                    </div>
                </div>
            </div>
            <LoanCalComp getAmount={getAmount} getDuration={getDuration} getMonthly={getMonthly} />
        </>
    )
}

export default MontlyPaymentComp