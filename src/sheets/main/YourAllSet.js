import React, { useRef, useState } from 'react'
import Header from '../../components/Header'
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../assests/json/congo.json';

const { REACT_APP_PUBLIC_URL } = process.env;

const YourAllSet = () => {


    /* animation */
    const loaderAnim = useRef(null);
    const animPlay = () => {
        loaderAnim.current.play();
    }
    /* animation end */

    /* usestate */
    const [showLoanCal, setShowLoanCal] = useState(false);
    /* usestate end */

    const intialAmount = localStorage.getItem('amount');
    const intialPeriod = localStorage.getItem('period');
    const intialMonthlyPayment = localStorage.getItem('monthlyPayment');


    /* toggle loan calculator */
    const toggleLoanCal = () => {
        setShowLoanCal(!showLoanCal);
    }
    /* toggle loan calculator end */

    return (
        <div>
            {/* Header Starts */}
            <Header />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img inner-bg-img" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.jpg')` }} ></div>
                <div className="container">
                    {/* start */}
                    <div className="congo-checkout">
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
                            <div className="checkout-list-box">
                                <div className="check-list check-list-head">
                                    <h6 className="form-quest">Loan details</h6>
                                    {/* <a href="#" class="comm-link">Save</a> */}
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Amount</div>
                                    <p className="check-amount">£{intialAmount}</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Period</div>
                                    <p className="check-amount">{intialPeriod / 30} months</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Monthly payment</div>
                                    <p className="check-amount">£{intialMonthlyPayment}</p>
                                </div>
                            </div>
                            {/* end */}
                            {/* start */}
                            <div className="checkout-list-box">
                                <div className="repay-link mob-comp">
                                    <a href="#!" className="comm-link" onClick={() => toggleLoanCal()}>
                                        {!showLoanCal ? 'Repayment schedule' : 'Close'}
                                    </a>
                                </div>
                                <div className={!showLoanCal ? 'repayment-list' : ''}>
                                    <div className="check-list check-list-head">
                                        <h6 className="form-quest">Repayment schedule</h6>
                                        <a href="#!" className="comm-link2">See all</a>
                                    </div>
                                    <div className="repay-list">
                                        <div className="check-list">
                                            <div className="check-lis-hdn">1st June 2022</div>
                                            <p className="check-amount">£171.82</p>
                                        </div>
                                        <div className="check-list">
                                            <div className="check-lis-hdn">1st July 2022</div>
                                            <p className="check-amount">£171.82</p>
                                        </div>
                                        <div className="check-list">
                                            <div className="check-lis-hdn">1st August 2022</div>
                                            <p className="check-amount">£171.82</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* end */}
                            {/* start */}
                            <div className="contact-box desktop-comp">
                                <div className="contact-top">
                                    <h6 className="form-quest">Customer support</h6>
                                    <p className="contact-time">Monday-Friday, 9AM-5PM</p>
                                </div>
                                <div className="contact-btm">
                                    <a href="#" className="contact-link">020 3695 7544</a>
                                    <a href="#" className="contact-link">info@creditstar.co.uk</a>
                                </div>
                            </div>
                            {/* end */}
                            <button className="button button--block">View account</button>
                        </div>
                        {/* start */}
                        <div className="contact-box mob-comp">
                            <div className="contact-top">
                                <h6 className="form-quest">Customer support</h6>
                                <p className="contact-time">Monday-Friday, 9AM-5PM</p>
                            </div>
                            <div className="contact-btm">
                                <a href="#" className="contact-link">020 3695 7544</a>
                                <a href="#" className="contact-link">info@creditstar.co.uk</a>
                            </div>
                        </div>
                        {/* end */}
                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default YourAllSet