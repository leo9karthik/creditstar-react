import React, { useContext, useRef, useState } from "react";

/* plugin */
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useAutoAnimate } from "@formkit/auto-animate/react";
/* plugin end */

/* service */
import gs from "../../service/global";
import AuthContext from "../../store/auth-context";
import { stepFun, toasterConfig } from "../../config/Constant";
/* service end */

/* component */
import animationData from "../../assests/json/loader_full.json";
import Header from "../../components/Header";
import InnerBgComp from "../../components/InnerBgComp";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const AlmostDone = () => {
  const authCtx = useContext(AuthContext);
  // console.log("welcomeStep4:", authCtx);
  const instanceId = authCtx?.instanceId;
  // console.log(instanceId);

  const navigate = useNavigate();

  /* usestate */
  const [animComplete, setAnimComplete] = useState(false);
  const [bankAcc, setBankAcc] = useState(null);
  /* usestate end */

  /* animation */
  const [almostDoneAnim] = useAutoAnimate();
  const [bankAccountAnim] = useAutoAnimate();
  const loaderAnim = useRef(null);
  const animPlay = () => {
    loaderAnim.current.play();
  };
  const animCompleted = () => {
    // console.log("Animation completed");
    setAnimComplete(true);

    let payload = {
      action: "submit",
      data: {},
    };
    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
      .then((response) => {
        const result = response?.data;
        const currentStep = result?.currentStepId;
        navigate(stepFun()[currentStep], { replace: true });
        authCtx.prefilledDataFunc(result?.prefilledData);
        // console.log(currentStep);

        toast.success("Almost Done!", toasterConfig);

      })
      .catch((error) => {
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        console.log(error);

        const serverError = error?.response?.data?.error?.message;
        // console.log(serverError)
        if (serverError) {
          toast.error(serverError, toasterConfig);
        }

        const errorResult = error?.response?.data?.errors[0];
        const arrayOfString = Object.values(errorResult);
        const arrayFlatten = arrayOfString.flat();

        // console.log("Error Result:", errorResult);
        const bankAccError = errorResult?.bankAccount;
        setBankAcc(bankAccError);
        // console.log(bankAccError)


        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        for (let itemData of arrayFlatten) {
          // console.log(itemData);

          toast.error(itemData, toasterConfig);
        }
      });
  };
  /* animation end */

  const backToBankFun = () => {
    // console.log("12132");

    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    let payload = {
      action: "back",
    };
    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
      .then((response) => {
        const result = response?.data;
        const currentStep = result?.currentStepId;
        navigate(stepFun()[currentStep], { replace: true });
        authCtx.prefilledDataFunc(result?.prefilledData);
        console.log(result);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        navigate("/bank-details", { replace: true });
      })
      .catch((error) => {
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        console.log(error);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */
      });
  };

  return (
    <div>
      {/* Header Starts */}
      <Header headerOne={true} />
      {/* Header Ends */}

      {/* Main Container Starts */}
      <div className="main-container">
        <InnerBgComp classes={"inner-bg-img add-bg-mob"} />

        <div className="container">
          {/* start */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="comm-box congo-box"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="congo-lottie"
            >
              <Player
                onEvent={(event) => {
                  if (event === "load") {
                    animPlay();
                  }

                  if (event === "complete") {
                    animCompleted();
                  }
                }}
                ref={loaderAnim}
                autoplay={true}
                controls={true}
                src={animationData}
                keepLastFrame={true}
              />
            </motion.div>
            <div className="congo-cont">

              <div ref={almostDoneAnim}>
                {
                  !animComplete &&
                  <div>
                    <motion.h4
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="congo-hdn"
                    >
                      Almost done
                    </motion.h4>
                    <motion.div
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="congo-para"
                    >
                      <p>
                        We are processing your application.
                        <br /> This won’t take a second
                      </p>
                    </motion.div>
                  </div>
                }
              </div>

              <div ref={bankAccountAnim}>
                {bankAcc && (
                  <button
                    className="button butn-blue mt24"
                    onClick={() => backToBankFun()}
                  >
                    Change Bank Account
                  </button>
                )}
              </div>
            </div>
          </motion.div>
          {/* end */}
        </div>
      </div>
      {/* Main Container Ends */}
    </div>
  );
};

export default AlmostDone;
