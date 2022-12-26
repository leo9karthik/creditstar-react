import React, { useContext, useEffect, useRef, useState } from 'react'

/* plugin */
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from "framer-motion";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
/* plugin end */

/* service */
import AuthContext from '../../store/auth-context';
import gs from '../../service/global';
import { toasterConfig } from '../../config/Constant';
/* service end */

/* component */
import Header from '../../components/Header'
import animationData from '../../assests/json/congo.json';
import InnerBgComp from '../../components/InnerBgComp';
/* component end */

const { REACT_APP_FLOWID } = process.env;

const YourAllSet = () => {
    const authCtx = useContext(AuthContext);
    const instanceId = authCtx?.instanceId;


    /* animation */
    const [scheduleListAnim] = useAutoAnimate();

    const loaderAnim = useRef(null);
    const animPlay = () => {
        loaderAnim.current.play();
    }
    /* animation end */

    /* usestate */
    // const installments = localStorage.getItem('installments');
    // const installmentsParse = JSON.parse(installments);
    const [scheduleList, setScheduleList] = useState(6);
    const [seeAllTxt, setSeeAllTxt] = useState(false);
    const [showLoanCal, setShowLoanCal] = useState(true);
    const [endData, setEndData] = useState({});
    /* usestate end */


    /* toggle loan calculator */
    const toggleLoanCal = () => {
        setShowLoanCal(!showLoanCal);
    }
    /* toggle loan calculator end */

    const sellAllFun = () => {
        setSeeAllTxt(!seeAllTxt);
        const totalListLength = endData?.installments.length;
        const scheduleDataList = seeAllTxt ? 6 : totalListLength;
        // console.log(scheduleDataList);
        setScheduleList(scheduleDataList);
    }

    useEffect(() => {
        // console.log(window.innerWidth);

        if (window.innerWidth <= 990) {
            setShowLoanCal(false);
        }


        /* fetch all data */
        let payload = {
            "action": "fetch"
        }

        axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data?.responseData;
                // console.log(result);
                setEndData(result);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

            })
            .catch((error) => {
                console.log(error);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

                toast.error('Something went wrong!', toasterConfig);

            });
        /* fetch all data end */

    }, [instanceId])

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
                        className="congo-checkout">
                        <div className="comm-box">
                            {/* start */}
                            <div className="comm-hdn-slide">
                                <div className="comm-hdn-box comm-rev">

                                    {/* start */}
                                    <div className="yourallset-lottie">
                                        <Player
                                            onEvent={event => {
                                                if (event === 'load') {
                                                    animPlay();
                                                }
                                            }}
                                            ref={loaderAnim}
                                            // loop={1}
                                            autoplay={true}
                                            controls={true}
                                            src={animationData}
                                        />
                                    </div>
                                    {/* end */}

                                    <h3 className="comm-hdn">
                                        You’re all set
                                    </h3>
                                    <div className="comm-para">
                                        <p>Your money is on it’s way.</p>
                                    </div>
                                </div>
                                <div className="tick-anim">
                                    <i className="icon-money-wave" />
                                </div>
                            </div>
                            {/* end */}
                            {/* start */}
                            {
                                (endData?.amount && endData?.duration && endData?.monthlyRepaymentAmount) &&
                                <div className="checkout-list-box">
                                    <div className="check-list check-list-head">
                                        <h6 className="form-quest">Loan details</h6>
                                        {/* <a href="#!" className="comm-link">Save</a> */}
                                    </div>
                                    <div className="check-list">
                                        <div className="check-lis-hdn">Amount</div>
                                        <p className="check-amount">£{Number(endData?.amount)}</p>
                                    </div>
                                    <div className="check-list">
                                        <div className="check-lis-hdn">Period</div>
                                        <p className="check-amount">{Number(endData?.duration / 30)} months</p>
                                    </div>
                                    <div className="check-list">
                                        <div className="check-lis-hdn">Monthly payment</div>
                                        <p className="check-amount">£{authCtx?.paymentData?.installmentAmount ? Number(authCtx?.paymentData?.installmentAmount).toFixed(2) : ""}</p>
                                    </div>
                                </div>
                            }
                            {/* end */}
                            {/* start */}
                            <div className="checkout-list-box">
                                <div className="repay-link mob-comp">
                                    <div className="comm-link" onClick={() => toggleLoanCal()}>
                                        {!showLoanCal ? 'Repayment schedule' : 'Close'}
                                    </div>
                                </div>

                                {endData?.installments &&
                                    <div ref={scheduleListAnim}>
                                        {showLoanCal &&
                                            <div>
                                                <div className="check-list check-list-head">
                                                    <h6 className="form-quest">Repayment schedule</h6>
                                                    <div className="comm-link2" onClick={() => sellAllFun()}>{!seeAllTxt ? "See all" : "Show less"}</div>
                                                </div>
                                                <div className="repay-list">
                                                    {endData?.installments.slice(0, scheduleList).map(item => (
                                                        <div className="check-list" key={item?.nr}>
                                                            <div className="check-lis-hdn">{moment(item?.dueDate).format('ddd, Do MMM YYYY')}</div>
                                                            <p className="check-amount">£{item?.total}</p>
                                                        </div>
                                                    ))}

                                                    {/* <div className="check-list">
                                                    <div className="check-lis-hdn">1st June 2022</div>
                                                    <p className="check-amount">£171.82</p>
                                                </div> */}

                                                </div>
                                            </div>
                                        }
                                    </div>
                                }


                            </div>
                            {/* end */}
                            {/* start */}
                            <div className="contact-box desktop-comp">
                                <div className="contact-top">
                                    <h6 className="form-quest">Customer support</h6>
                                    <p className="contact-time">Monday-Friday, 9AM-5PM</p>
                                </div>
                                <div className="contact-btm">
                                    <a href="tel:020 3695 7544" className="contact-link">020 3695 7544</a>
                                    <a href="mailto:info@creditstar.co.uk" className="contact-link">info@creditstar.co.uk</a>
                                </div>
                            </div>
                            {/* end */}
                            <a href={endData?.loginUrl} className="button button--block">View account</a>
                        </div>
                        {/* start */}
                        <div className="contact-box mob-comp">
                            <div className="contact-top">
                                <h6 className="form-quest">Customer support</h6>
                                <p className="contact-time">Monday-Friday, 9AM-5PM</p>
                            </div>
                            <div className="contact-btm">
                                <a href="tel:020 3695 7544" className="contact-link">020 3695 7544</a>
                                <a href="mailto:info@creditstar.co.uk" className="contact-link">info@creditstar.co.uk</a>
                            </div>
                        </div>
                        {/* end */}
                    </motion.div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default YourAllSet