import React from 'react';
// import Slider, { Range } from 'rc-slider';
// import 'rc-slider/assets/index.css';



const LoanCalComp = () => {

    const openCalculatorFn = () => {
        console.log("clicked Me!");

        document.querySelector(".yourloan").classList.add("show");
        document.querySelector(".card-main-amt").classList.add("dnone");

    }

    const closeCalculatorFn = () => {
        console.log("clicked Me!");

        document.querySelector(".yourloan").classList.remove("show");
        document.querySelector(".card-main-amt").classList.remove("dnone");
    }


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
                <div className="rnge-slide-box">
                    <div className="rnge-slide">
                        <div className="rnge-top">
                            <h6 className="rnge-hdn">Loan amount</h6>
                            <div className="form-grp amt-slider">
                                <input className="form-field" type="text" id="amount" name="amount" defaultValue="£2500" />
                                {/* <p class="form-label">First Name</p> */}
                            </div>
                        </div>
                        <div className="drag-slide">
                            <img src="./img/drag-slide.png" alt="" />
                            {/* 
                            <Slider />
                            <Range /> */}


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
                            <img src="./img/drag-slide.png" alt="" />
                        </div>
                        <div className="rnge-btm">
                            <p>6 months</p>
                            <p>18 months</p>
                        </div>
                    </div>
                </div>
                <div className="rnge-total">
                    <h6 className="rnge-total-hdn">Estimated monthly payment</h6>
                    <h6 className="rnge-total-price">£171.82</h6>
                </div>
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
            </div>

        </div>
    )
}

export default LoanCalComp