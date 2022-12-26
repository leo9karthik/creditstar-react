import React, { useContext, useEffect, useState } from "react";

/* plugin */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Modal from "react-bootstrap/Modal";
import { Base64 } from "js-base64";
/* plugin end */

/* service */
import AuthContext from "../../../store/auth-context";
import gs from "../../../service/global";
import { stepFun, toasterConfig } from "../../../config/Constant";
/* service end */

/* component */
import Header from "../../../components/Header";
import MontlyPaymentComp from "../../../components/MontlyPaymentComp";
import RadioButton from "../../../components/base/RadioButton";
import InnerBgComp from "../../../components/InnerBgComp";
import ErrorMsgComp from "../../../components/ErrorMsgComp";
import PopupContentComp from "../../../components/PopupContentComp";
/* component end */

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const Welcome = () => {
  const authCtx = useContext(AuthContext);
  // console.log("welcomejs:", authCtx);
  const instanceId = authCtx?.instanceId;
  var prefilledData = authCtx?.prefilledData || {};
  // console.log(authCtx);

  const navigate = useNavigate();

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
  const { loanPurpose, termsAndPrivacyConsent } = prefilledData;
  // console.log(prefilledData);

  const [updateDate, setUpdateDate] = useState(null);
  const [document, setDocument] = useState(null);
  let termDocument = document?.terms_and_conditions && Base64.decode(document?.terms_and_conditions);
  let privacyDocument = document?.privacy_policy && Base64.decode(document?.privacy_policy);
  // console.log(privacyDocument);

  const [disableBtn, setDisableBtn] = useState(termsAndPrivacyConsent);
  const [termCheckbox, setTermCheckbox] = useState(termsAndPrivacyConsent);

  const [termModal, setTermModal] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  /* usestate end */

  /* Post data */
  const onSubmit = (data) => {
    // console.log(data);

    let payload = {
      action: "submit",
      data: {
        loanPurpose: data?.welcomeRadio,
        termsAndPrivacyConsent: termCheckbox,
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

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        toast.error("Something went wrong!", toasterConfig);
      });
  };
  /* Post data end */

  /* get radio */
  const termCheckboxFun = (value) => {
    // console.log(value);
    setTermCheckbox(value);
    setDisableBtn(value);
  };
  /* get radio end */

  useEffect(() => {
    localStorage.removeItem("mobileData");

    let payload = {
      action: "fetch",
    };

    axios
      .post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
      .then((response) => {
        const result = response?.data;
        // console.log(result);
        setUpdateDate(result?.responseData);
        setDocument(result?.responseData);

        localStorage.setItem(
          "termDocument",
          JSON.stringify(result?.responseData)
        );

        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [instanceId]);



  /* radio data */
  const welcomeData = {
    welcomeRadioData: [
      {
        id: "homeImprovement",
        value: "Home Improvement",
      },
      {
        id: "buyingACar",
        value: "Buying a Car",
      },
      {
        id: "consolidatingDebt",
        value: "Consolidating debt",
      },
      {
        id: "other",
        value: "Other",
      },
    ]
  }
  /* radio data end */

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
                <div className="comm-hdn-box">
                  <h3 className="comm-hdn">Welcome
                    <img className="ml8" src={`${REACT_APP_PUBLIC_URL}/img/emoji.svg`} alt="welcome emoji" />
                  </h3>
                  <div className="comm-para">
                    <p>To get started, tell us about the purpose of loan.</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="wel-check-box mob-full-chk">
                    <div className="wel-radio-box">
                      {/* start */}
                      {welcomeData?.welcomeRadioData?.map(item => (
                        <RadioButton
                          key={item?.id}
                          id={item?.id}
                          name="welcomeRadio"
                          title={item?.value}
                          value={item?.value}
                          defaultChecked={item?.value === loanPurpose}
                          register={register}
                          rules={{ required: true }}
                        />
                      ))}
                      {/* end */}
                      {errors.welcomeRadio?.type === "required" && (
                        <ErrorMsgComp
                          classes={"mt0"}
                          errorMessage={"This field is required"}
                        />
                      )}
                    </div>
                  </div>

                  <div className="check-box">
                    <input
                      type="checkbox"
                      name="termCheckbox"
                      id="term"
                      // value={termCheckbox}
                      defaultChecked={termCheckbox}
                      onClick={(e) => termCheckboxFun(e.target.checked)}
                    />
                    <label className="check-label" htmlFor="term">
                      I have read and agree with the <a href="#!" onClick={() => setTermModal(true)}> terms </a> & <a href="#!" onClick={() => setPrivacyModal(true)}> privacy </a> and to receive Credistar updates and offers.
                    </label>
                  </div>
                  {/* [disabled] */}
                  <button className="button button--block" disabled={!disableBtn} > Get started </button>
                </form>
              </div>
              {/* end */}
            </motion.div>
          </div>
          {/* end */}
        </div>
      </div>
      {/* Main Container Ends */}

      {/* Term popup */}
      <Modal
        className="comm-modal"
        show={termModal}
        onHide={() => setTermModal(false)}
      >
        <PopupContentComp
          modalTitle={"Terms and Conditions"}
          date={updateDate}
          modalContent={termDocument}
          onClick={() => setTermModal(false)}
        />
      </Modal>
      {/* Term popup end */}

      {/* Privacy popup */}
      <Modal
        className="comm-modal"
        show={privacyModal}
        onHide={() => setPrivacyModal(false)}
      >
        <PopupContentComp
          modalTitle={"Privacy Policy"}
          date={updateDate}
          modalContent={privacyDocument}
          onClick={() => setPrivacyModal(false)}
        />
      </Modal>
      {/* Privacy popup end */}
    </div>
  );
};

export default Welcome;
