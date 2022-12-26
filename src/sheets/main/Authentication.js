import React, { useContext, useEffect, useState } from "react";

/* plugin */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
/* plugin end */

/* service */
import formService from "../../service/formService";
import AuthContext from "../../store/auth-context";
import gs from "../../service/global";
import { stepFun, toasterConfig } from "../../config/Constant";
/* service end */

/* component */
import ErrorMsgComp from "../../components/ErrorMsgComp";
import InnerBgComp from "../../components/InnerBgComp";
import AuthHeader from "../../components/AuthHeader";
import AuthHeadingComp from "../../components/AuthHeadingComp";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const Authentication = () => {
  const authCtx = useContext(AuthContext);
  const instanceId = authCtx?.instanceId;
  // console.log(instanceId);
  const navigate = useNavigate();
  // console.log(authCtx);

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

  /* Post Data */
  const onSubmit = (data) => {
    let inputData = data;
    // console.log(inputData?.password);

    let payload = {
      action: "submit",
      data: {
        password: inputData?.password,
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
        // console.log(currentStep);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

      })
      .catch((error) => {
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        // console.log(error?.response?.data?.currentStepId);
        const errorResult = error?.response?.data?.errors;
        console.log("Error Result:", errorResult);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        for (let itemData of errorResult) {
          // console.log(itemData);

          toast.error(itemData, toasterConfig);
        }
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
                <h2 className="auth-hdn">Authentication</h2>
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
                {/* <div className="auth-btn"> */}
                <button className="button button--block" type="submit">
                  <span>Submit</span>
                </button>
              </form>
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

export default Authentication;
