import React from 'react'

const { REACT_APP_PUBLIC_URL } = process.env;

const MontlyPaymentComp = () => {
    return (
        <div className="welcome-pay">
            <div className="wel-img">
                <img src={`${REACT_APP_PUBLIC_URL}/img/payment-bg.png`} alt="" />
            </div>
            <div className="wel-cont-box">
                <div className="wel-mont-pay">
                    <h5 className="wel-hdn">Monthly payment</h5>
                    <h6 className="wel-pay-val">£171.82</h6>
                </div>
                <div className="wel-flex">
                    {/* start */}
                    <div className="wel-period">
                        <div className="wel-icon">
                            <i className="icon-loan-amount" />
                        </div>
                        <div className="wel-per-cont">
                            <h5 className="wel-per-hdn">Loan amount</h5>
                            <h6 className="wel-per-price">£2500</h6>
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
                            <h6 className="wel-per-price">18 months</h6>
                        </div>
                    </div>
                    {/* end */}
                </div>
            </div>
        </div>
    )
}

export default MontlyPaymentComp