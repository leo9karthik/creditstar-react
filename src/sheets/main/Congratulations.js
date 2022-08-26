import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import { useForm } from "react-hook-form";

const { REACT_APP_PUBLIC_URL } = process.env;

const Congratulations = () => {

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

        navigate("/card-detail", { replace: true });
    }

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
                    <div className="comm-box congo-checkout">
                        {/* start */}
                        <div className="comm-hdn-slide">
                            <div className="comm-hdn-box">
                                <h3 className="comm-hdn">
                                    Congratulations!
                                </h3>
                                <div className="comm-para">
                                    <p>Well done! Your first Creditstar Loan has been approved.</p>
                                </div>
                            </div>
                            <div className="tick-anim">
                                <i className="icon-check" />
                            </div>
                        </div>
                        {/* end */}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* start */}
                            <div className="checkout-list-box">
                                <div className="check-list check-list-head">
                                    <div className="check-lis-hdn">Loan details</div>
                                    <a href="#" className="comm-link">Change</a>
                                </div>

                                <div className="dnone">
                                    <div className="rnge-slide-box">
                                        <div className="rnge-slide">
                                            <div className="rnge-top">
                                                <h6 className="rnge-hdn">Amount</h6>
                                                <div className="form-grp amt-slider">
                                                    <input className="form-field" type="text" id="amount" name="amount" defaultValue="£2500" />
                                                    {/* <p class="form-label">First Name</p> */}
                                                </div>
                                            </div>
                                            <div className="drag-slide">
                                                <img src="./img/drag-slide-big.png" alt="" />
                                            </div>
                                            <div className="rnge-btm">
                                                <p>£500</p>
                                                <p>£5000</p>
                                            </div>
                                        </div>
                                        <div className="rnge-slide">
                                            <div className="rnge-top">
                                                <h6 className="rnge-hdn">Period</h6>
                                                <div className="form-grp amt-slider">
                                                    <input className="form-field" type="text" id="amount" name="amount" defaultValue={10} />
                                                    {/* <p class="form-label">First Name</p> */}
                                                </div>
                                            </div>
                                            <div className="drag-slide">
                                                <img src="./img/drag-slide-big.png" alt="" />
                                            </div>
                                            <div className="rnge-btm">
                                                <p>6 months</p>
                                                <p>18 months</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="check-list">
                                    <div className="check-lis-hdn">Amount</div>
                                    <p className="check-amount">£2500</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Period</div>
                                    <p className="check-amount">18 months</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Monthly payment</div>
                                    <p className="check-amount">£171.82</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Rate (APR)</div>
                                    <p className="check-amount">23.8%</p>
                                </div>
                                <div className="check-list">
                                    <div className="check-lis-hdn">Total repayable</div>
                                    <p className="check-amount">£3092.76</p>
                                </div>
                            </div>
                            {/* end */}
                            {/* start */}
                            <div className="form-grp-box">
                                <div className="form-quest-box">
                                    <h6 className="form-quest">Set repayment date</h6>
                                    <div className="form-para">
                                        <p>We recommend selecting your payday</p>
                                    </div>
                                </div>
                                <div className="form-grp-field">
                                    <div className="form-grp">
                                        <select
                                            className="select-field form-field"
                                            id="select-fld"
                                            name="repayment"
                                            {...register("repayment", {
                                                required: "Repayment date is required",
                                            })}

                                        >
                                            <option></option>
                                            <option>1st of every month</option>
                                            <option>1st of every month</option>
                                            <option>1st of every month</option>
                                            <option>1st of every month</option>
                                            <option>1st of every month</option>
                                        </select>
                                        {/* <p class="form-label">1st of every month</p> */}
                                    </div>
                                    {errors.repayment &&
                                        <div className="form-input-error">
                                            <i className="icon-input-error"></i>
                                            <p>{errors.repayment.message}</p>
                                        </div>
                                    }
                                    {/* end */}
                                </div>
                            </div>
                            {/* end */}
                            {/* start */}
                            <div className="form-grp-box">
                                <h6 className="form-quest">Repayment schedule</h6>
                                <div className="form-grp-field">
                                    <div className="form-grp">
                                        <select
                                            className="select-field form-field"
                                            id="select-fld"
                                            name="repayment_schedule"
                                            {...register("repayment_schedule", {
                                                required: "Repayment schedule date is required",
                                            })}

                                        >
                                            <option></option>
                                            <option>£171.82, 1st July 2022</option>
                                            <option>£171.82, 1st July 2022</option>
                                            <option>£171.82, 1st July 2022</option>
                                            <option>£171.82, 1st July 2022</option>
                                            <option>£171.82, 1st July 2022</option>
                                        </select>
                                        {/* <p class="form-label">£171.82, 1st July 2022</p> */}
                                    </div>
                                    {errors.repayment_schedule &&
                                        <div className="form-input-error">
                                            <i className="icon-input-error"></i>
                                            <p>{errors.repayment_schedule.message}</p>
                                        </div>
                                    }
                                    {/* end */}
                                </div>
                            </div>
                            {/* end */}
                            <div className="comm-disclaim">
                                <p>
                                    Amount of credit £900 over 12 months. Interest £398.81. Interest rate 73% pa (fixed), 0.2% per
                                    day of the amount borrowed. Repay with 12 equal instalments of £108.23. Total amount payable
                                    1298.81. Representative 100.96%.
                                </p>
                            </div>
                            <button className="button button--block">Confirm</button>
                        </form>

                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>

    )
}

export default Congratulations