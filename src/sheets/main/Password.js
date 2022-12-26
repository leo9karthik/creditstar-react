import React, { useContext, useEffect, useState } from "react";

/* plugin */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
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
import Header from "../../components/Header";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const Password = () => {
  const authCtx = useContext(AuthContext);
  const instanceId = authCtx?.instanceId;
  // console.log(instanceId);
  const navigate = useNavigate();
  // console.log(authCtx);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    // mode: "onBlur",
    mode: "all",
  });

  /* password function */
  const [eyeIcon, setEyeIcon] = useState(false);
  const [reyeIcon, setReyeIcon] = useState(false);

  const togglePassword = () => {
    setEyeIcon(!eyeIcon);
  };
  const toggleRepeatPassword = () => {
    setReyeIcon(!reyeIcon);
  };

  const password = watch("password");
  /* password function end */

  /* Post Data */
  const onSubmit = (data) => {
    let inputData = data;
    // console.log(inputData?.verificationcode);

    let payload = {
      action: "submit",
      data: {
        password: inputData?.password,
        repeatPassword: inputData?.repeatPassword,
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

        /* Loader Starts */
        gs.showLoader(false);
        // toast.success('Password set successfully.', toasterConfig);
        /* Loader Ends */

      })
      .catch((error) => {
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        console.log(error);
        const errorResult = error?.response?.data?.errors?.password[0];
        console.log(errorResult);

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
      <Header />
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
                <h2 className="auth-hdn">Create a password</h2>
                <div className="auth-para">
                  <p>
                    All set! Create a new password for your Creditstar account.
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
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <p className="form-label">New password</p>
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
                <div className="form-grp-field">
                  <div className="form-grp int-padr">
                    <input
                      className="form-field"
                      type={reyeIcon ? "text" : "password"}
                      id="repeatPassword"
                      name="repeatPassword"
                      {...register("repeatPassword", {
                        required: "Repeat password is required",
                        validate: (value) =>
                          value === password || "The passwords do not match",
                      })}
                    />
                    <p className="form-label">Confirm password</p>
                    <i
                      className={`view-pass ${reyeIcon ? "icon-eye" : "icon-eye-slash"
                        }`}
                      onClick={() => toggleRepeatPassword()}
                    ></i>
                  </div>
                  {errors.repeatPassword && (
                    <ErrorMsgComp
                      errorMessage={errors.repeatPassword.message}
                    />
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

export default Password;
