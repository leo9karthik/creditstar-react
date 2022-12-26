import React, { useContext } from 'react'

/* component */
import AuthContext from '../store/auth-context';
/* component end */

const ApprovedLoadComp = () => {
    const authCtx = useContext(AuthContext);
    // console.log(authCtx);

    return (
        <>
            <div className="comm-box wel-loan desktop-comp">
                <div className="comm-hdn-box loan-det-hdn">
                    <h3 className="comm-hdn">
                        Your approved loan
                    </h3>
                    {/* <a href="#!" className="comm-link">Change</a> */}
                </div>

                <div className="loan-card-det">
                    <div className="check-list">
                        <div className="check-lis-hdn">Amount</div>
                        {authCtx?.amountSlideValue && <p className="check-amount">£{authCtx?.amountSlideValue}</p>}
                    </div>
                    <div className="check-list">
                        <div className="check-lis-hdn">Period</div>
                        {authCtx?.periodSlideValue && <p className="check-amount">{authCtx?.periodSlideValue} months</p>}
                    </div>
                </div>
                <div className="rnge-total mb0">
                    <h6 className="rnge-total-hdn">Estimated monthly payment</h6>
                    {authCtx?.paymentData?.installmentAmount && <p className='rnge-total-price'>£{Number(authCtx?.paymentData?.installmentAmount).toFixed(2)} /mo</p>}
                </div>

            </div>


            <div className="comm-box wel-loan mob-comp">
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
                        {authCtx?.paymentData?.total && <p>£{Number(authCtx?.paymentData?.total).toFixed(2)} /mo</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApprovedLoadComp