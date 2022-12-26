import React, { useContext, useState } from "react";

/* plugin */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
/* plugin end */

/* service */
import gs from "../../../service/global";
import AuthContext from "../../../store/auth-context";
import { stepFun, toasterConfig } from "../../../config/Constant";
/* service end */

/* component */
import Header from "../../../components/Header";
import InnerBgComp from "../../../components/InnerBgComp";
import MontlyPaymentComp from "../../../components/MontlyPaymentComp";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const WelcomeStep2In1 = () => {
  const authCtx = useContext(AuthContext);
  // console.log("welcomeStep2in1:", authCtx);
  const instanceId = authCtx?.instanceId;

  /* steps */
  const [steps, setSteps] = useState(1);
  setTimeout(() => {
    setSteps(2);
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */

  const navigate = useNavigate();

  const addressData = JSON.parse(localStorage.getItem("residentialAddress"));
  // console.log(addressData);

  const residencyDataFun = () => {
    // console.log("Address Data:", addressData);

    let payload = {
      action: "submit",
      data: {
        address: addressData?.address,
        postcode: addressData?.postcode,
        houseNo: addressData?.houseNo,
        houseName: addressData?.houseName,
        street: addressData?.street,
        city: addressData?.city,
        region: addressData?.region,
        moveInMonth: addressData?.moveInMonth,
        moveInYear: addressData?.moveInYear,
        residentialStatus: addressData?.residentialStatus,
        amount: authCtx?.amountSlideValue,
        duration: authCtx?.periodSlideValueMonth,
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
        /* Loader Ends */

      })
      .catch((error) => {
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        console.log(error);
        const errorResult = error?.response?.data?.errors;
        const arrayOfString = Object.values(errorResult);
        const arrayFlatten = arrayOfString.flat();

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        for (let itemData of arrayFlatten) {
          // console.log(itemData);

          toast.error(itemData, toasterConfig);
        }
      });
  };

  const backToAddress = () => {
    navigate("/address", { replace: true });
  };
  /* Post data end */


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
          <div className="welcome-box">
            <div className="welcome-right">
              {/* start */}
              <MontlyPaymentComp />
              {/* end */}
            </div>
            <motion.div
              initial={{ y: 60, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="welcome-left"
            >
              {/* start */}
              <div className="comm-box">
                <div className="comm-hdn-slide">
                  <div className="comm-hdn-box">
                    <h3 className="comm-hdn">Where you live</h3>
                    <div className="comm-para">
                      <p>
                        Search and add your residency address.
                      </p>
                    </div>
                  </div>
                  <div className="comm-step">

                    <CircularProgressbar
                      strokeWidth={8}
                      value={percentage}
                      text={`${steps}/4`}
                      styles={buildStyles({
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",

                        // Text size
                        textSize: "22px",

                        // Colors
                        pathColor: `rgba(0, 230, 210, 1)`,
                        textColor: "#938E9E",
                        trailColor: "#F8F7F9",
                      })}
                    />
                  </div>
                </div>
                <div className="addr-main-box">
                  <div className="addr-card">
                    {/* <h5 className="addr-hdn">Current address</h5> */}
                    <h5 className="form-quest">Please confirm your address</h5>
                    {/* start */}
                    <div className="addr-box">
                      <div className="addr-hdn-cross">
                        <div className="addr-cont-box">
                          <h6 className="addr-cont-hdn">
                            {addressData?.houseNo || addressData?.houseName
                              ? `${addressData?.houseNo} ${addressData?.houseName},`
                              : null}
                            <br />
                            {addressData?.street
                              ? `${addressData?.street},`
                              : null}
                            <br />
                            {addressData?.city || addressData?.region
                              ? `${addressData?.city} ${addressData?.region},`
                              : null}
                            <br />
                            {addressData?.postcode
                              ? `${addressData?.postcode}`
                              : null}
                            <br />
                          </h6>
                          <p className="addr-owner">
                            Moved in {addressData?.fullMonth} {addressData?.moveInYear}
                          </p>
                        </div>
                        <div
                          className="addr-ico"
                          onClick={() => backToAddress()}
                        >
                          <i className="icon-close" />
                        </div>
                      </div>
                      <div className="addr-cont-owner">
                        <p className="addr-owner">
                          {addressData?.residentialStatus}
                        </p>
                        <div className="comm-link" onClick={() => backToAddress()} > Change </div>
                      </div>
                    </div>
                    {/* end */}
                  </div>
                </div>
                {/* [disabled] */}
                <button className="button button--block" onClick={() => residencyDataFun()} > Continue </button>
              </div>
              {/* end */}
            </motion.div>
          </div>
          {/* end */}
        </div>
      </div>
      {/* Main Container Ends */}
    </div>
  );
};

export default WelcomeStep2In1;
