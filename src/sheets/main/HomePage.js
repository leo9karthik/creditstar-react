import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import formService from '../../service/formService';
import AuthContext from '../../store/auth-context';
// import Cookies from 'universal-cookie';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const HomePage = () => {
    // const cookies = new Cookies();

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });



    const onSubmit = async (data) => {
        let inputData = data;
        // console.log(inputData);

        let numAmout = Number.parseInt(inputData?.amount);
        let numDuration = Number.parseInt(inputData?.duration);

        let monthCal = numDuration * 30;
        // console.log(+numAmout, +numDuration);

        let payload = {
            "action": "submit",
            "data": {
                "amount": numAmout,
                "duration": monthCal
            }
        }
        // console.log(payload);




        // { withCredentials: true }
        axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances`, payload)
            .then((response) => {
                const result = response?.data;
                authCtx.createInstanceFunc(result?.id);
                authCtx.currentStepFunc(result?.currentStepId);


                /* Monthly payment interest calculation */
                localStorage.setItem('amount', numAmout);
                localStorage.setItem('period', monthCal);


                let totalInterest = numDuration * 6;
                let calculateIntersetAmout = numAmout * (totalInterest / 100);

                let totalAmountWithInt = numAmout + calculateIntersetAmout;
                let monthlyPayment = (totalAmountWithInt / numDuration).toFixed(2);

                localStorage.setItem('monthlyPayment', monthlyPayment);
                /* Monthly payment interest calculation end */


                // console.log('cookies', cookies.getAll());
                // console.log('cookies PHPSESSID', cookies.get('PHPSESSID'));
                // console.log("headers", response.headers);

                // navigate("/login", { replace: true });
            })
            .catch((error) => {
                console.log(error);

            });
    }



    useEffect(() => {


        /* form service */
        formService.inputEmptyCheck();
        /* form service end */
    }, [])


    return (
        <div>




            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/home-banner-img.png')` }}>
                    {/* <img src="./img/home-banner-img.png" alt=""> */}
                </div>
                {/* start */}
                <div className="comm-rev">
                    <div className="container">

                        {/* form */}
                        <div className="form-box">
                            <div className="auth-hdn-box">
                                <h2 className="auth-hdn">
                                    Home
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-grp-field">
                                    <div className="form-grp">
                                        <input
                                            className="form-field"
                                            type="number"
                                            id="amount"
                                            name="amount"
                                            defaultValue={500}
                                            autoComplete="off"
                                            {...register("amount", {
                                                required: "Amount is required",
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message: "Enter a valid amount"
                                                }
                                            })}
                                        />
                                        <p className="form-label">Amount</p>
                                    </div>
                                    {/* {errors.amount && <p className="error-msg">{errors.amount.message}</p>} */}
                                    {errors.amount &&
                                        <div className="form-input-error">
                                            <i className="icon-input-error"></i>
                                            <p>{errors.amount.message}</p>
                                        </div>
                                    }

                                </div>


                                <div className="form-grp-field">
                                    <div className="form-grp">
                                        <input
                                            className="form-field"
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            defaultValue={6}
                                            autoComplete="off"
                                            {...register("duration", {
                                                required: "Duration is required",
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message: "Enter a valid duration"
                                                }
                                            })}
                                        />
                                        <p className="form-label">Duration</p>
                                    </div>
                                    {/* {errors.duration && <p className="error-msg">{errors.duration.message}</p>} */}
                                    {errors.duration &&
                                        <div className="form-input-error">
                                            <i className="icon-input-error"></i>
                                            <p>{errors.duration.message}</p>
                                        </div>
                                    }

                                </div>
                                <button className="button button--block" type="submit"><span>Send code</span></button>
                            </form>
                        </div>
                        {/* form end */}
                    </div>
                </div>
                {/* end */}
            </div>
            {/* Main Container Ends */}

        </div >
    )
}

export default HomePage