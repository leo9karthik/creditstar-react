import React, { useContext, useEffect } from "react";

/* plugin */
import { useNavigate } from "react-router-dom";
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

const OtpVerification = () => {
  const authCtx = useContext(AuthContext);
  const instanceId = authCtx?.instanceId;
  // console.log(instanceId);
  const navigate = useNavigate();
  // console.log(authCtx);

  /* get mobile data */
  const getMobileData = localStorage.getItem("mobileData");
  const parseData = JSON.parse(getMobileData);
  /* get mobile data end */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onBlur",
    mode: "all",
  });

  /* change number function */
  const changeNumber = () => {
    // console.log("Change Number");

    let payload = {
      action: "back",
    };
    // console.log(payload);

    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
      .then((response) => {
        const result = response?.data;
        const currentStep = result?.currentStepId;
        navigate(stepFun()[currentStep], { replace: true });

        // redirect to login
        navigate(`/${instanceId}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        const errorResult = error?.response?.data?.errors[0];
        console.log("Error Result:", errorResult);
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        toast.error("Something went wrong!", toasterConfig);
      });
  };
  /* change number function end */

  /* Resend OTP function */
  const resendOtp = () => {
    // console.log("Resend OTP");

    let payload = {
      action: "resend",
    };
    // console.log(payload);

    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
      .then((response) => {
        const result = response?.data;
        const currentStep = result?.currentStepId;
        navigate(stepFun()[currentStep], { replace: true });

        const notificationResult = result?.notifications[0];
        // console.log(notificationResult);

        /* Loader Starts */
        gs.showLoader(false);
        toast.success(notificationResult, toasterConfig);
        /* Loader Ends */
      })
      .catch((error) => {
        console.log(error);
        const errorResult = error?.response;
        console.log("Error Result:", errorResult);
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        toast.error("Something went wrong!", toasterConfig);
      });
  };
  /* Resend OTP function end */

  /* Post Data */
  const onSubmit = (data) => {
    let inputData = data;
    // console.log(inputData);

    let payload = {
      action: "submit",
      data: {
        phoneCode: inputData?.verificationcode,
      },
    };
    // console.log(payload);

    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
      .then((response) => {

        const result = response?.data;
        const currentStep = result?.currentStepId;
        navigate(stepFun()[currentStep], { replace: true });
        authCtx.prefilledDataFunc(result?.prefilledData);
        // console.log(result);

        const preData = result?.prefilledData || {};
        // console.log(+preData?.amount)
        authCtx?.createAmountValueFunc(+preData?.amount);
        authCtx?.createPeriodValueFunc(+preData?.duration / 30);

        /* Loader Starts */
        gs.showLoader(false);
        toast.success(
          "Your mobile number verified successfully.",
          toasterConfig
        );
        /* Loader Ends */

      })
      .catch((error) => {
        console.log(error);
        const errorResult = error?.response?.data?.errors[0];
        // console.log("Error Result:", errorResult);
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        toast.error(errorResult, toasterConfig);
      });
  };
  /* Post Data end */

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
        <InnerBgComp bgImg={true} />

        {/* start */}
        <div className="comm-rev">
          <div className="container">

            {/* heading component */}
            <AuthHeadingComp />
            {/* heading component end */}

            {/* form */}
            <motion.div
              initial={{ y: 60, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="form-box"
            >

              <div className="auth-hdn-box">
                <h2 className="auth-hdn">Enter code</h2>
                <div className="auth-para">
                  <p>
                    Verification code sent to
                    <i>
                      <span> {parseData?.phoneNumber}</span>{" "}
                      <a href="#!" onClick={() => changeNumber()}>
                        {" "}
                        Change
                      </a>
                    </i>
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-grp-field">
                  <div className="form-grp">
                    <input
                      className="form-field"
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      id="verification-code"
                      name="verificationcode"
                      defaultValue={parseData?.otpCode}
                      {...register("verificationcode", {
                        required: "Verification code is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Enter a valid Verification code",
                        },
                      })}
                    />
                    <p className="form-label">Verification code</p>
                  </div>
                  {errors.verificationcode && (
                    <ErrorMsgComp
                      errorMessage={errors.verificationcode.message}
                    />
                  )}
                </div>
                <div className="auth-para ap-txt-cen mob-rm-resend">
                  <p> Didn’t get the code? <b className="comm-link" onClick={() => resendOtp()} > Resend </b>
                  </p>
                </div>
                {/* <div className="auth-btn"> */}
                <button className="button button--block" type="submit">
                  <span>Verify</span>
                </button>
              </form>
              <button
                className="button butn-white button--block resend-mob"
                onClick={() => resendOtp()}
              >
                <span>Resend</span>
              </button>
              {/* </div> */}
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

export default OtpVerification;
