import React, { useContext, useEffect, useState } from "react";

/* plugin */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { Base64 } from "js-base64";
/* plugin end */

/* service */
import { stepFun, toasterConfig } from "../../config/Constant";
import AuthContext from "../../store/auth-context";
import gs from "../../service/global";
/* service end */

/* component */
import Header from "../../components/Header";
import ApprovedLoadComp from "../../components/ApprovedLoadComp";
import ErrorMsgComp from "../../components/ErrorMsgComp";
import InnerBgComp from "../../components/InnerBgComp";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const FinalizeLoanDetail = () => {
  const authCtx = useContext(AuthContext);
  const instanceId = authCtx?.instanceId;
  // var prefilledData = authCtx?.prefilledData || {};
  // console.log(authCtx);

  const navigate = useNavigate();

  /* prefilled data */
  // const { preContractConsent, agreementConsent, preContractInformation } = prefilledData;
  /* prefilled data end */

  /* react-form-hook */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onBlur",
    mode: "all",
  });
  /* react-form-hook end */

  /* usestate */
  const [document, setDocument] = useState(null);
  let loanagreementDoc = document?.loan_agreement && Base64.decode(document?.loan_agreement);
  let adequateExplanationsDoc = document?.adequate_explanations && Base64.decode(document?.adequate_explanations);
  let secciDoc = document?.secci && Base64.decode(document?.secci);

  // console.log(loanagreementDoc);
  /* usestate end */

  /* Post data */
  const onSubmit = (data) => {
    let inputData = data;
    // console.log(inputData);

    let payload = {
      action: "submit",
      data: {
        preContractConsent: inputData?.preContractConsent,
        agreementConsent: inputData?.agreementConsent,
        preContractInformation: inputData?.preContractInformation,
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

        toast.success("Your all set", toasterConfig);

      })
      .catch((error) => {
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        console.log(error);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        toast.error("Something went wrong!", toasterConfig);
      });
  };
  /* Post data end */

  useEffect(() => {
    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    let payload = {
      action: "fetch",
      data: {},
    };

    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
      .then((response) => {
        const result = response?.data?.responseData;
        // console.log(result);
        setDocument(result);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */
      })
      .catch((error) => {
        console.log(error);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */
      });
  }, []);

  return (
    <div>
      {/* Header Starts */}
      <Header />
      {/* Header Ends */}

      {/* Main Container Starts */}
      <div className="main-container">
        <InnerBgComp classes={"inner-bg-img"} />

        <div className="container">
          {/* start */}
          <div className="welcome-box">
            <motion.div
              initial={{ y: 60, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="welcome-right"
            >
              {/* start */}
              <ApprovedLoadComp />
              {/* end */}
            </motion.div>

            <motion.div
              initial={{ y: 60, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="welcome-left"
            >
              {/* start */}
              <div className="comm-box">
                <div className="comm-hdn-box">
                  <h3 className="comm-hdn">Your loan terms & conditions</h3>
                  <div className="comm-para">
                    <p>
                      Please review and confirm your loan terms.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="term-main-box">
                    <div className="form-quest-box">
                      <h6 className="form-quest">Pre-Contract Information</h6>
                    </div>
                    <div className="term-height mb0">
                      <div className="term-box comm-scroll">
                        {secciDoc && (
                          <div
                            className="term-content"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(secciDoc),
                            }}
                          />
                        )}
                      </div>
                      {/* start */}
                      <div className="chk-main-term">
                        <div className="check-box chk-border-black mb0">
                          <input
                            type="checkbox"
                            id="preContractInformation"
                            name="preContractInformation"
                            // defaultChecked={preContractInformation}
                            {...register("preContractInformation", {
                              required: "Pre-Contract Information consent is required",
                            })}
                          />
                          <label
                            className="check-label"
                            htmlFor="preContractInformation"
                          >
                            I have read and agree to the terms & conditions of
                            the Pre-Contract Information.
                          </label>
                        </div>
                      </div>
                      {/* end */}
                    </div>
                    {errors.preContractInformation && (
                      <ErrorMsgComp
                        errorMessage={errors.preContractInformation.message}
                      />
                    )}
                  </div>
                  <div className="term-main-box">
                    <div className="form-quest-box">
                      <p className="form-quest">Loan agreement</p>
                    </div>
                    <div className="term-height mb0">
                      <div className="term-box comm-scroll">

                        {loanagreementDoc && (
                          <div
                            className="term-content"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(loanagreementDoc),
                            }}
                          />
                        )}
                      </div>
                      {/* start */}
                      <div className="chk-main-term">
                        <div className="check-box chk-border-black mb0">
                          <input
                            type="checkbox"
                            id="preContractConsent"
                            name="preContractConsent"
                            // defaultChecked={preContractConsent}
                            {...register("preContractConsent", {
                              required: "Loan agreement consent is required",
                            })}
                          />
                          <label
                            className="check-label"
                            htmlFor="preContractConsent"
                          >
                            I have read and agree to the terms & conditions of
                            the Loan Agreement.
                          </label>
                        </div>
                      </div>
                      {/* end */}
                    </div>
                    {errors.preContractConsent && (
                      <ErrorMsgComp
                        errorMessage={errors.preContractConsent.message}
                      />
                    )}
                  </div>
                  <div className="term-main-box">
                    <div className="form-quest-box">
                      <h6 className="form-quest">Adequate Explanations</h6>
                      <div className="form-para">
                        <p>Your Creditstar loan contract summary</p>
                      </div>
                    </div>
                    <div className="term-height mb0">
                      <div className="term-box comm-scroll">
                        {adequateExplanationsDoc && (
                          <div
                            className="term-content"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(adequateExplanationsDoc),
                            }}
                          />
                        )}
                      </div>
                      {/* start */}
                      <div className="chk-main-term">
                        <div className="check-box chk-border-black mb0">
                          <input
                            type="checkbox"
                            id="agreementConsent"
                            name="agreementConsent"
                            // defaultChecked={agreementConsent}
                            {...register("agreementConsent", {
                              required:
                                "Adequate Explanations consent is required",
                            })}
                          />
                          <label
                            className="check-label"
                            htmlFor="agreementConsent"
                          >
                            I have read and fully understand the explanation of
                            the fixed sum loan agreement.
                          </label>
                        </div>
                      </div>
                      {/* end */}
                    </div>
                    {errors.agreementConsent && (
                      <ErrorMsgComp
                        errorMessage={errors.agreementConsent.message}
                      />
                    )}
                  </div>
                  <div className="comm-disclaim">
                    <p>
                      We use your personal information to set up and administer
                      your loan. For detailed information about how we process
                      your personal data and including why we share your
                      information with credit reference agencies (CRAs) and
                      fraud prevention services, please refer to our Privacy
                      Notice.
                    </p>
                  </div>
                  {/* [disabled] */}
                  <button className="button button--block">Finish</button>
                </form>
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

export default FinalizeLoanDetail;
