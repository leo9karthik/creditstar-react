import React, { useContext, useEffect, useState } from 'react';

/* plugin */
import { useForm } from 'react-hook-form';
import 'react-rangeslider/lib/index.css'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { motion } from "framer-motion";
/* plugin end */

/* service */
import AuthContext from '../store/auth-context';
/* service end */

/* component */
import PaymentCalculationComp from './PaymentCalculationComp';
/* component end */

const LoanCalComp = () => {
    const authCtx = useContext(AuthContext);
    // const instanceId = authCtx?.instanceId;
    // console.log(instanceId);

    /* animation */
    const [parent] = useAutoAnimate();
    /* animation end */

    /* loan calculator add remove class */
    const [openModal, setOpenModal] = useState(true);

    const toggleCalculatorFn = (e) => {
        e.preventDefault()
        setOpenModal(!openModal);
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



    useEffect(() => {
        // console.log(window.innerWidth);

        if (window.innerWidth <= 990) {
            setOpenModal(false);
        }

    }, [])


    return (
        <motion.div
            initial={{ y: 60, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <div className="comm-box wel-loan" ref={parent}>
                {
                    !openModal &&
                    <div className="card-main-amt" >
                        <div className="card-amt-flex">
                            <div className="card-amt">
                                <h6>Loan amount</h6>
                                {authCtx?.amountSlideValue && <p>£{authCtx?.amountSlideValue}</p>}
                            </div>
                            <div className="card-amt">
                                <h6>Period</h6>
                                {authCtx?.periodSlideValue && <p>{authCtx?.periodSlideValue} months</p>}
                            </div>
                            <div className="card-amt">
                                <h6>Estimated payment</h6>
                                {authCtx?.paymentData?.installmentAmount && <p>£{Number(authCtx?.paymentData?.installmentAmount).toFixed(2)} /mo</p>}
                            </div>
                        </div>
                        <div className="card-amt-icon cur-point" onClick={(e) => toggleCalculatorFn(e)}>
                            <i className="icon-pencil" />
                        </div>
                    </div>
                }


                {
                    openModal &&
                    <div>
                        <div className="comm-hdn-cross">
                            <h3 className="comm-hdn">
                                Your loan
                            </h3>
                            <div className="loan-cross cur-point" onClick={(e) => toggleCalculatorFn(e)}>
                                <i className="icon-close" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" ref={parent}>


                            <PaymentCalculationComp getMonthly={true} />

                            <div className="comm-disclaim mb0">
                                <p>
                                    Amount of credit £900 over 12 months. Interest £398.81. Interest rate 73% pa
                                    (fixed),
                                    0.2% per day of the amount borrowed. Repay with 12 equal instalments of £108.23.
                                    Total
                                    amount payable 1298.81. Representative 100.96%.
                                </p>
                                <p>
                                    <b>Warning</b>: Late repayment can cause you serious money problems. For help, go to <a href="https://www.moneyhelper.org.uk/" target="_blank">moneyhelper.org.uk</a>
                                </p>
                            </div>
                            <button className="button button--block loan-amt-btn" onClick={(e) => toggleCalculatorFn(e)}>Save</button>
                        </form>
                    </div>
                }
            </div>
        </motion.div>

    )
}

export default LoanCalComp