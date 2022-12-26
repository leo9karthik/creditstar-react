import React, { useContext, useEffect, useState } from "react";

/* plugin */
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";
/* plugin end */

/* service */
import AuthContext from "../../store/auth-context";
import gs from "../../service/global";
import { stepFun, toasterConfig } from "../../config/Constant";
import formService from "../../service/formService";
/* service end */

/* component */
import ErrorMsgComp from "../../components/ErrorMsgComp";
import AuthHeader from "../../components/AuthHeader";
import InnerBgComp from "../../components/InnerBgComp";
import AuthHeadingComp from "../../components/AuthHeadingComp";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const SignInActiveLoan = () => {
    const authCtx = useContext(AuthContext);
    // const instanceId = authCtx?.instanceId;
    // console.log(instanceId);

    const navigate = useNavigate();

    /* form */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });
    /* form end */

    /* password function */
    const [eyeIcon, setEyeIcon] = useState(false);
    const togglePassword = () => {
        setEyeIcon(!eyeIcon);
    };
    /* password function end */

    const onSubmit = (data) => {
        let inputData = data;
        console.log(inputData);

        // let payload = {
        //   action: "submit",
        //   data: {
        //     phoneNumber: inputData?.mobilenumber,
        //   },
        // };
        // console.log(payload);

        /* Loader Starts */
        // gs.showLoader(true);
        /* Loader Ends */

        // axios
        //   .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceParamsId}`, payload)
        //   .then((response) => {

        //     const result = response?.data;
        //     authCtx.createInstanceFunc(result?.id);
        //     authCtx.prefilledDataFunc(result?.prefilledData);
        //     const currentStep = result?.currentStepId;
        //     // console.log(result);
        //     // console.log(data);

        //     /* Loader Starts */
        //     gs.showLoader(false);
        //     toast.success(
        //       "Verification code sent! It will arrive shortly.",
        //       toasterConfig
        //     );
        //     /* Loader Ends */

        //     navigate(stepFun()[currentStep], { replace: true });
        //   })
        //   .catch((error) => {
        //     const errorStep = error?.response?.data?.currentStepId;
        //     navigate(stepFun()[errorStep], { replace: true });

        //     const serverError = error?.message;
        //     // console.log(serverError);

        //     /* Loader Starts */
        //     gs.showLoader(false);
        //     /* Loader Ends */

        //     if (serverError) {
        //       // console.log(itemData);

        //       toast.error(serverError, toasterConfig);
        //     }

        //     const errorResult = error?.response?.data?.errors;
        //     const arrayOfString = Object.values(errorResult);
        //     const arrayFlatten = arrayOfString.flat();

        //     for (let itemData of arrayFlatten) {
        //       // console.log(itemData);

        //       toast.error(itemData, toasterConfig);
        //     }
        //   });
    };

    useEffect(() => {

        /* form service */
        formService.inputEmptyCheck();
        /* form service end */

    }, []);

    return (
        <div>
            {/* Header Starts */}
            <AuthHeader />
            {/* Header Ends */}

            {/* Main Container Starts */}
            <div className="main-container">
                <InnerBgComp classes={"inner-bg-img"} />

                {/* start */}
                <div className="comm-rev">
                    <div className="container">

                        {/* form */}
                        <motion.div
                            initial={{ y: 60, scale: 0.8, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="form-box form-box-mt"
                        >
                            <div className="auth-hdn-box">
                                <h2 className="auth-hdn">Sign in</h2>
                                <div className="auth-para">
                                    <p>
                                        You already have an active loan to your account.{'\n'}
                                        Please add your password to sign in.
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-grp-field">
                                    <div className="form-grp int-padr">
                                        <input
                                            className="form-field"
                                            type={eyeIcon ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            // defaultValue={"parool"}
                                            {...register("password", {
                                                required: "Password is required",
                                            })}
                                        />
                                        <p className="form-label">Password</p>
                                        <i
                                            className={`view-pass ${eyeIcon ? "icon-eye" : "icon-eye-slash"
                                                }`}
                                            onClick={() => togglePassword()}
                                        ></i>
                                    </div>
                                    {errors.password && (
                                        <ErrorMsgComp errorMessage={errors.password.message} />
                                    )}
                                </div>
                                <div className="auth-para ap-txt-cen">
                                    <b className="comm-link"> Forgot password? </b>
                                </div>
                                <button className="button button--block" type="submit">
                                    <span>Sign In</span>
                                </button>
                            </form>
                        </motion.div>
                        {/* form end */}
                    </div>
                </div>
                {/* end */}
            </div>
            {/* Main Container Ends */}
        </div>
    );
};

export default SignInActiveLoan;
