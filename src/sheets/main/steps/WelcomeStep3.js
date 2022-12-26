import React, { useContext, useEffect, useState } from "react";

/* plugin */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
/* plugin end */

/* service */
import gs from "../../../service/global";
import formService from "../../../service/formService";
import AuthContext from "../../../store/auth-context";
import { stepFun, toasterConfig } from "../../../config/Constant";
/* service emd */

/* component */
import Header from "../../../components/Header";
import MontlyPaymentComp from "../../../components/MontlyPaymentComp";
import ErrorMsgComp from "../../../components/ErrorMsgComp";
import RadioButton from "../../../components/base/RadioButton";
import InnerBgComp from "../../../components/InnerBgComp";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const WelcomeStep3 = () => {
  const authCtx = useContext(AuthContext);
  // console.log("welcomeStep3:", authCtx);
  const instanceId = authCtx?.instanceId;
  var prefilledData = authCtx?.prefilledData || {};
  // console.log(instanceId);

  /* steps */
  const [steps, setSteps] = useState(2);
  setTimeout(() => {
    setSteps(3);
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */

  /* usestate */
  const {
    employmentStatus,
    organization,
    netMonthlyIncome,
    monthlyCouncilTax,
    monthlyUtilities,
    monthlyRentMortgage,
    monthlyGroceries,
    monthlyTransport,
    monthlyOthers,
  } = prefilledData;
  /* usestate end */

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

  /* Post data */
  const onSubmit = (data) => {
    let inputData = data;
    // console.log(inputData);

    let payload = {
      action: "submit",
      data: {
        employmentStatus: inputData?.empstatusRadio,
        organization: inputData?.organization,
        netMonthlyIncome: inputData?.monthincome,
        monthlyCouncilTax: inputData?.council,
        monthlyUtilities: inputData?.utilities,
        monthlyRentMortgage: inputData?.rent,
        monthlyGroceries: inputData?.groceries,
        monthlyTransport: inputData?.transport,
        monthlyOthers: inputData?.expenses,
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
        // console.log(currentStep);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

      })
      .catch((error) => {
        const errorMsg = error?.response?.data;
        const errorEnd = errorMsg?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        const otherError = errorMsg;
        console.log(otherError);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        toast.error("Something went wrong!", toasterConfig);
      });
  };
  /* Post data end */


  useEffect(() => {
    /* form service */
    formService.inputEmptyCheck();
    /* form service end */
  }, []);




  /* radio data */
  const financesRadioData = {
    empstatusRadioData: [
      {
        id: "fulltime",
        value: "Full-time employed",
      },
      {
        id: "parttime",
        value: "Part-time employed",
      },
      {
        id: "selfemp",
        value: "Self-employed",
      },
      {
        id: "other",
        value: "Other",
      },
    ],
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
                <div className="comm-hdn-slide">
                  <div className="comm-hdn-box">
                    <h3 className="comm-hdn">Your finances</h3>
                    <div className="comm-para">
                      <p>
                        Tell us about employment & finances.
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

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">Are you employed?</p>
                    <div className="mob-full-chk employ-radio-box">
                      {/* start */}
                      {financesRadioData?.empstatusRadioData?.map(item => (
                        <RadioButton
                          key={item?.id}
                          id={item?.id}
                          name="empstatusRadio"
                          title={item?.value}
                          value={item?.value}
                          defaultChecked={item?.value === employmentStatus}
                          register={register}
                          rules={{ required: true }}
                        />
                      ))}
                      {/* end */}
                    </div>
                    {errors.empstatusRadio?.type === "required" && (
                      <ErrorMsgComp
                        classes={"mt0"}
                        errorMessage={"Employee status is required"}
                      />
                    )}
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">Where are you working?</p>
                    <div className="form-grp-field">
                      <div className="form-grp">
                        <input
                          className="form-field"
                          type="text"
                          id="organization"
                          name="organization"
                          defaultValue={organization}
                          {...register("organization", {
                            required: "Organization is required",
                          })}
                        />
                        <p className="form-label">
                          Employer / Organization name
                        </p>
                      </div>
                      {errors.organization && (
                        <ErrorMsgComp
                          errorMessage={errors.organization.message}
                        />
                      )}
                    </div>
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">
                      What's your net monthly income?
                    </p>
                    <div className="form-grp-field">
                      <div className="form-grp form-inp-txt">
                        <input
                          className="form-field"
                          type="number"
                          onWheel={(e) => e.target.blur()}
                          id="monthincome"
                          name="monthincome"
                          defaultValue={netMonthlyIncome}
                          {...register("monthincome", {
                            required: "Monthly income is required",
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "Enter a valid number.",
                            },
                            // min: {
                            //   value: 1,
                            //   message: "Number should be greater than 0"
                            // },
                          })}
                        />
                        <p className="form-label">£</p>
                        <em>£</em>
                      </div>
                      {errors.monthincome && (
                        <ErrorMsgComp
                          errorMessage={errors.monthincome.message}
                        />
                      )}
                    </div>
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">
                      How much do you spend per month?
                    </p>
                    <div className="multi-form-field mb0">
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            id="council"
                            name="council"
                            defaultValue={monthlyCouncilTax}
                            {...register("council", {
                              required: "Council is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Enter a valid number.",
                              },
                            })}
                          />
                          <p className="form-label">Council Tax (£) </p>
                          <em>£</em>
                        </div>
                        {errors.council && (
                          <ErrorMsgComp errorMessage={errors.council.message} />
                        )}
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            id="utilities"
                            name="utilities"
                            defaultValue={monthlyUtilities}
                            {...register("utilities", {
                              required: "Utilities is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Enter a valid number.",
                              },
                            })}
                          />
                          <p className="form-label">Utilities (£) </p>
                          <em>£</em>
                        </div>
                        {errors.utilities && (
                          <ErrorMsgComp
                            errorMessage={errors.utilities.message}
                          />
                        )}
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            id="rent"
                            name="rent"
                            defaultValue={monthlyRentMortgage}
                            {...register("rent", {
                              required: "Rent is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Enter a valid number.",
                              },
                            })}
                          />
                          <p className="form-label">Rent / Mortgage (£) </p>
                          <em>£</em>
                        </div>
                        {errors.rent && (
                          <ErrorMsgComp errorMessage={errors.rent.message} />
                        )}
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            id="groceries"
                            name="groceries"
                            defaultValue={monthlyGroceries}
                            {...register("groceries", {
                              required: "Groceries is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Enter a valid number.",
                              },
                            })}
                          />
                          <p className="form-label">Groceries (£) </p>
                          <em>£</em>
                        </div>
                        {errors.groceries && (
                          <ErrorMsgComp
                            errorMessage={errors.groceries.message}
                          />
                        )}
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            id="transport"
                            name="transport"
                            defaultValue={monthlyTransport}
                            {...register("transport", {
                              required: "Transport is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Enter a valid number.",
                              },
                            })}
                          />
                          <p className="form-label">Transport (£) </p>
                          <em>£</em>
                        </div>
                        {errors.transport && (
                          <ErrorMsgComp
                            errorMessage={errors.transport.message}
                          />
                        )}
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            id="expenses"
                            name="expenses"
                            defaultValue={monthlyOthers}
                            {...register("expenses", {
                              required: "Other committed expenses is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Enter a valid number.",
                              },
                            })}
                          />
                          <p className="form-label">
                            Other committed expenses (£){" "}
                          </p>
                          <em>£</em>
                        </div>
                        {errors.expenses && (
                          <ErrorMsgComp
                            errorMessage={errors.expenses.message}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* end */}

                  {/* start */}
                  {/* <div className="form-grp-box">
                        <p className="form-quest">Are you expecting a significant income decrease in the recent future?
                        </p>
  
                        <div className="title-chk">
                            <div className="radio-btn">
                                <input type="checkbox" id="income1" name="income" required />
                                <label className="radio-label" for="income1">
                                    <span> Yes </span>
                                </label>
                            </div>
                            <div className="radio-btn">
                                <input type="checkbox" id="income2" name="income" required />
                                <label className="radio-label" for="income2">
                                    <span> No </span>
                                </label>
                            </div>
                        </div>
                    </div> */}
                  {/* end */}

                  <div className="comm-disclaim">
                    <p>
                      *This relates to any regular monthly outgoings you have at
                      the moment. Any existing loan that you may have is taken
                      into account, as are the repayments you make on any
                      personal loans.
                    </p>
                  </div>

                  {/* [disabled] */}
                  <button className="button button--block">Continue</button>
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

export default WelcomeStep3;
