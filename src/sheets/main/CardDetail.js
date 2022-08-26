import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import { useForm } from "react-hook-form";
import formService from '../../service/formService';

const { REACT_APP_PUBLIC_URL } = process.env;

const CardDetail = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });


    const onSubmit = (data) => {
        let payload = data;
        console.log(payload);

        navigate("/finalize-loan-detail", { replace: true });
    }



    useEffect(() => {

        /* form service */
        formService.inputEmptyCheck();
        /* form service end */
    }, [])



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
                    <div className="welcome-box">
                        <div className="welcome-right">
                            {/* start */}
                            <div className="comm-box wel-loan desktop-comp">
                                <div className="comm-hdn-box loan-det-hdn">
                                    <h3 className="comm-hdn">
                                        Your approved loan
                                    </h3>
                                    {/* <a href="#" class="comm-link">Change</a> */}
                                </div>
                                <div className="loan-card-det">
                                    <div className="check-list">
                                        <div className="check-lis-hdn">Amount</div>
                                        <p className="check-amount">£2500</p>
                                    </div>
                                    <div className="check-list">
                                        <div className="check-lis-hdn">Period</div>
                                        <p className="check-amount">18 months</p>
                                    </div>
                                </div>
                                <div className="rnge-total mb0">
                                    <h6 className="rnge-total-hdn">Estimated monthly payment</h6>
                                    <h6 className="rnge-total-price">£171.82</h6>
                                </div>
                            </div>
                            {/* end */}
                            {/* start */}
                            <div className="comm-box wel-loan mob-comp">
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
                            </div>
                            {/* end */}
                        </div>
                        <div className="welcome-left">
                            {/* start */}
                            <div className="comm-box">
                                <div className="comm-hdn-box">
                                    <h3 className="comm-hdn">
                                        Your card details
                                    </h3>
                                    <div className="comm-para">
                                        <p>Where should we take repayments from?</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-grp-box">
                                        {/* <div class="form-quest-box">
                                        <p class="form-quest">What's your annual income before tax?</p>
                                    </div> */}
                                        {/* For disable visa logo add class [gry-scale] */}
                                        <div className="card-img">
                                            <img src={`${REACT_APP_PUBLIC_URL}/img/visa.svg`} alt="" />
                                        </div>
                                        <div className="multi-form-field">
                                            <div className="form-grp-field">
                                                <div className="form-grp">
                                                    <input
                                                        className="form-field"
                                                        type="text"
                                                        id="cardname"
                                                        name="cardname"
                                                        {...register("cardname", {
                                                            required: "Name on card is required"
                                                        })}
                                                    />
                                                    <p className="form-label">Name on card</p>
                                                </div>
                                                {errors.cardname &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.cardname.message}</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className="form-grp-field">
                                                <div className="form-grp">
                                                    <input
                                                        className="form-field"
                                                        type="text"
                                                        id="cardnumber"
                                                        name="cardnumber"
                                                        {...register("cardnumber", {
                                                            required: "Name on card is required"
                                                        })}
                                                    />
                                                    <p className="form-label">Card number</p>
                                                </div>
                                                {errors.cardnumber &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.cardnumber.message}</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="f-row custm-frow">
                                            <div className="w33 w-480-25">
                                                {/* start */}
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <input
                                                            className="form-field"
                                                            type="text"
                                                            id="ddcard"
                                                            name="ddcard"
                                                            {...register("ddcard", {
                                                                required: "Date is required"
                                                            })}
                                                        />
                                                        <p className="form-label">DD</p>
                                                    </div>
                                                    {errors.ddcard &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors.ddcard.message}</p>
                                                        </div>
                                                    }
                                                </div>
                                                {/* end */}
                                            </div>
                                            <div className="w33 w-480-25">
                                                {/* start */}
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <input
                                                            className="form-field"
                                                            type="text"
                                                            id="mmcard"
                                                            name="mmcard"
                                                            {...register("mmcard", {
                                                                required: "Month is required"
                                                            })}
                                                        />
                                                        <p className="form-label">MM</p>
                                                    </div>
                                                    {errors.mmcard &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors.mmcard.message}</p>
                                                        </div>
                                                    }
                                                </div>
                                                {/* end */}
                                            </div>
                                            <div className="w33 w-480-50">
                                                {/* start */}
                                                <div className="form-grp-field">
                                                    <div className="form-grp">
                                                        <input
                                                            className="form-field"
                                                            type="text"
                                                            id="cvvcard"
                                                            name="cvvcard"
                                                            {...register("cvvcard", {
                                                                required: "CVV is required"
                                                            })}
                                                        />
                                                        <p className="form-label">CVV</p>
                                                    </div>
                                                    {errors.cvvcard &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors.cvvcard.message}</p>
                                                        </div>
                                                    }
                                                </div>
                                                {/* end */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* [disabled] */}
                                    <button className="button button--block" >Add</button>
                                </form>
                            </div>
                            {/* end */}
                        </div>
                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default CardDetail