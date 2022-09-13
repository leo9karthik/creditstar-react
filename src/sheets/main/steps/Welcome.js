import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../../../components/Header'
import LoanCalComp from '../../../components/LoanCalComp'
import MontlyPaymentComp from '../../../components/MontlyPaymentComp'

const { REACT_APP_PUBLIC_URL } = process.env;

const Welcome = () => {
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

        navigate("/welcome-step-1", { replace: true });
    }



    return (
        <div>

            {/* Header Starts */}
            <Header headerOne={true} />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img inner-bg-img add-bg-mob" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.png')` }}>
                </div>
                <div className="container">
                    {/* start */}
                    <div className="welcome-box">
                        <div className="welcome-right">

                            {/* start */}
                            <MontlyPaymentComp />
                            {/* end */}

                            {/* start */}
                            <LoanCalComp />
                            {/* end */}

                        </div>
                        <div className="welcome-left">
                            {/* start */}
                            <div className="comm-box ">
                                <div className="comm-hdn-box">
                                    <h3 className="comm-hdn">
                                        Welcome!
                                    </h3>
                                    <div className="comm-para">
                                        <p>To get started, tell us about the purpose of loan.</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="wel-check-box mob-full-chk">
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                id="homeImprovement"
                                                name="checkbox-welcome[]"
                                                {...register("homeImprovement")}
                                            />
                                            <label className="chk-label" htmlFor="homeImprovement">
                                                <span> Home improvement </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                id="car"
                                                name="checkbox-welcome[]"
                                                {...register("car")}
                                            />
                                            <label className="chk-label" htmlFor="car">
                                                <span> Car </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                id="debtConsolidation"
                                                name="checkbox-welcome[]"
                                                {...register("debtConsolidation")}
                                            />
                                            <label className="chk-label" htmlFor="debtConsolidation">
                                                <span> Debt consolidation </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                        {/* start */}
                                        <div className="checkbox-box check-three">
                                            <input
                                                type="checkbox"
                                                id="other"
                                                name="checkbox-welcome[]"
                                                {...register("other")}
                                            />
                                            <label className="chk-label" htmlFor="other">
                                                <span> Other </span>
                                            </label>
                                        </div>
                                        {/* end */}
                                    </div>
                                    <div className="checkbox-box term-chk wel-chk">
                                        <input type="checkbox" id="term1" name="term1" required />
                                        <label className="chk-label" htmlFor="term1">
                                            I have read and agree with the
                                            <a href="#">terms & privacy</a>
                                            and to receive Credistar updates and offers.
                                        </label>
                                    </div>
                                    {/* [disabled] */}
                                    <button className="button button--block">Get started</button>
                                </form>
                            </div>
                            {/* end */}
                        </div>
                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}

        </div >

    )
}

export default Welcome