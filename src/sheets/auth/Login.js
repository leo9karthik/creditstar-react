import React, { useContext, useEffect } from "react";

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

const Login = () => {
  const authCtx = useContext(AuthContext);
  // const instanceId = authCtx?.instanceId;
  // console.log(instanceId);
  let { instanceParamsId } = useParams();
  // console.log(instanceParamsId);

  const navigate = useNavigate();

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

  const onSubmit = (data) => {
    let inputData = data;
    // console.log(inputData?.mobilenumber);

    let payload = {
      action: "submit",
      data: {
        phoneNumber: inputData?.mobilenumber,
      },
    };
    // console.log(payload);

    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceParamsId}`, payload)
      .then((response) => {

        const result = response?.data;
        authCtx.createInstanceFunc(result?.id);
        authCtx.prefilledDataFunc(result?.prefilledData);
        const otpCode = result?.responseData?.otpCode;
        const currentStep = result?.currentStepId;
        // console.log(result);

        let data = {
          phoneNumber: inputData?.mobilenumber,
          otpCode,
        };
        localStorage.setItem("mobileData", JSON.stringify(data));
        // console.log(data);

        /* Loader Starts */
        gs.showLoader(false);
        toast.success(
          "Verification code sent! It will arrive shortly.",
          toasterConfig
        );
        /* Loader Ends */

        navigate(stepFun(instanceParamsId)[currentStep], { replace: true });
      })
      .catch((error) => {
        const errorStep = error?.response?.data?.currentStepId;
        navigate(stepFun(instanceParamsId)[errorStep], { replace: true });

        const serverError = error?.message;
        // console.log(serverError);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        if (serverError) {
          // console.log(itemData);

          toast.error(serverError, toasterConfig);
        }

        const errorResult = error?.response?.data?.errors;
        const arrayOfString = Object.values(errorResult);
        const arrayFlatten = arrayOfString.flat();

        for (let itemData of arrayFlatten) {
          // console.log(itemData);

          toast.error(itemData, toasterConfig);
        }
      });
  };

  useEffect(() => {
    // console.log("Current Step Removed");
    localStorage.clear();

    /* form service */
    formService.inputEmptyCheck();
    /* form service end */

    authCtx.createInstanceFunc(instanceParamsId);
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
              <div className="info-txt">
                <i className="icon-info info-ico" />
                <p>This won’t affect your credit score</p>
              </div>
              <div className="auth-hdn-box">
                <h2 className="auth-hdn">Your mobile number</h2>
                <div className="auth-para">
                  <p>We will send verification code on this number.</p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-grp-field">
                  <div className="form-grp">
                    <input
                      className="form-field"
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      id="mobilenumber"
                      name="mobilenumber"
                      defaultValue={parseData?.phoneNumber || ""}
                      autoComplete="off"
                      {...register("mobilenumber", {
                        required: "Mobile Number is required.",
                        pattern: {
                          value: /^07\d{9}$/,
                          message: "Phone Number must start with 07.",
                        },
                        minLength: {
                          value: 11,
                          message: "Phone Number must consist of 11 digits.",
                        },
                        maxLength: {
                          value: 11,
                          message: "Phone Number must consist of 11 digits.",
                        },
                      })}
                    />
                    <p className="form-label">UK mobile number</p>
                  </div>
                  {/* {errors.mobilenumber && <p className="error-msg">{errors.mobilenumber.message}</p>} */}
                  {errors.mobilenumber && (
                    <ErrorMsgComp errorMessage={errors.mobilenumber.message} />
                  )}
                </div>
                <button className="button button--block" type="submit">
                  <span>Send code</span>
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

export default Login;
