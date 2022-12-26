import React, { useContext } from 'react'

/* plugin */
import { motion } from "framer-motion";
/* plugin end */

/* service */
import AuthContext from '../store/auth-context';
/* service end */

/* component */
import LoanCalComp from './LoanCalComp';
/* component end */

const { REACT_APP_PUBLIC_URL } = process.env;

const MontlyPaymentComp = () => {
    const authCtx = useContext(AuthContext);
    // console.log("montly payment authCtx", authCtx);


    return (
        <>
            <motion.div
                initial={{ y: 60, scale: 0.9, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="welcome-pay">
                <div className="wel-img">
                    <img src={`${REACT_APP_PUBLIC_URL}/img/payment-bg.png`} alt="" />
                </div>
                <div className="wel-cont-box">
                    <div className="wel-mont-pay">
                        <h5 className="wel-hdn">Monthly payment</h5>
                        {authCtx?.paymentData?.installmentAmount &&
                            <h6 className="wel-pay-val">£{Number(authCtx?.paymentData?.installmentAmount).toFixed(2)}</h6>
                        }
                    </div>
                    <div className="wel-flex">
                        {/* start */}
                        <div className="wel-period">
                            <div className="wel-icon">
                                <i className="icon-loan-amount" />
                            </div>
                            <div className="wel-per-cont">
                                <h5 className="wel-per-hdn">Loan amount</h5>
                                <h6 className="wel-per-price">£ {authCtx?.amountSlideValue}</h6>
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
                                <h6 className="wel-per-price">{authCtx?.periodSlideValue} months</h6>
                            </div>
                        </div>
                        {/* end */}
                    </div>
                </div>
            </motion.div>
            <LoanCalComp
                // getAmount={getAmount} 
                // getDuration={getDuration} 
                getMonthly={true}
            />
        </>
    )
}

export default MontlyPaymentComp