import React, { useContext, useEffect, useState } from "react";

/* plugin */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
/* plugin end */

/* service */
import formService from "../../../service/formService";
import AuthContext from "../../../store/auth-context";
import gs from "../../../service/global";
import { stepFun, toasterConfig } from "../../../config/Constant";
/* service end */

/* component */
import MontlyPaymentComp from "../../../components/MontlyPaymentComp";
import ErrorMsgComp from "../../../components/ErrorMsgComp";
import RadioButton from "../../../components/base/RadioButton";
import InnerBgComp from "../../../components/InnerBgComp";
import Header from "../../../components/Header";
/* component end */

const { REACT_APP_FLOWID } = process.env;

const WelcomeStep1 = () => {
  const authCtx = useContext(AuthContext);
  // console.log("welcomeStep1:", authCtx);
  const instanceId = authCtx?.instanceId;
  var prefilledData = authCtx?.prefilledData || {};
  // console.log(prefilledData);

  /* steps */
  const [steps, setSteps] = useState(0);
  setTimeout(() => {
    setSteps(1);
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */

  /* usestate */
  const { title, numberOfDependents, dateOfBirth, email, firstName, lastName } =
    prefilledData;

  const yearStart = moment(new Date()).subtract(18, "years").calendar();
  // console.log(yearStart);

  const [startDate, setStartDate] = useState(dateOfBirth ? new Date(dateOfBirth) : null);
  const [startMonth, setStartMonth] = useState(dateOfBirth ? new Date(dateOfBirth) : null);
  const [startYear, setStartYear] = useState(dateOfBirth ? new Date(dateOfBirth) : null);
  const dateMoment = moment(startDate).format('DD');
  const monthMoment = moment(startMonth).format('MM');
  const yearMoment = moment(startYear).format('yyyy');

  const [staticDate, setStaticDate] = useState(null);
  // const startDateFunc = (date) => {
  //   setStartDate(date);
  //   // console.log(date);
  // };
  const startDateFunc = (select) => {
    var value = select.value;
    // console.log(value);
    setStaticDate(value);
    setStartDate(value);
  }
  const startMonthFunc = (date) => {
    setStartMonth(date);
    // console.log(date);

  };
  const startYearFunc = (date) => {
    setStartYear(date);
    // console.log(date);
  };

  // const [startDate, setStartDate] = useState(dateOfBirth ? new Date(dateOfBirth) : new Date());
  // const [startMonth, setStartMonth] = useState(dateOfBirth ? new Date(dateOfBirth) : new Date());
  // const [startYear, setStartYear] = useState(dateOfBirth ? new Date(dateOfBirth) : new Date(yearStart));
  // console.log(dateOfBirth, new Date("2022-03-25"));
  /* usestate end */

  const navigate = useNavigate();

  /* react-form-hook */
  const {
    register,
    control,
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

    // const dobValue = `${inputData?.yybirth}-${inputData?.mmbirth}-${inputData?.ddbirth}`;
    const dobValue = `${moment(startYear).format("yyyy")}-${moment(
      startMonth
    ).format("MM")}-${staticDate ? staticDate : moment(startDate).format('DD')}`;
    // console.log(dobValue);

    let payload = {
      action: "submit",
      data: {
        email: inputData?.emailaddress,
        title: inputData?.titleRadio,
        firstName: inputData?.firstname,
        lastName: inputData?.lastname,
        dateOfBirth: dobValue,
        numberOfDependents: inputData?.dependentsRadio,
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
        /* console.log(currentStep); */

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        toast.success("Basic info added", toasterConfig);

      })
      .catch((error) => {
        const errorEnd = error?.response?.data?.currentStepId;
        navigate(stepFun()[errorEnd], { replace: true });
        console.log(error);
        const errorResult = error?.response?.data?.errors;
        const arrayOfString = Object.values(errorResult);
        const arrayFlatten = arrayOfString.flat();
        // const errorArrayString = arrayOfString.toString();
        // console.log("Error Result:", arrayFlatten);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        for (let itemData of arrayFlatten) {
          // console.log(itemData);

          toast.error(itemData, toasterConfig);
        }
      });



  };
  /* Post data end */

  /* DOB functionality */
  // const [dateValue, setDateValue] = useState([])
  /* DOB functionality end */

  useEffect(() => {
    // const dateFieldArray = [];
    // for (let i = 1; i <= 31; i++) {
    //   console.log(i)
    //   dateFieldArray.push(i);
    // }
    // setDateValue(dateFieldArray);

    /* form service */
    formService.inputEmptyCheck();
    /* form service end */
  }, []);





  /* radio data */
  const aboutRadioData = {
    titleRadioData: [
      {
        id: "mr",
        value: "Mr",
      },
      {
        id: "ms",
        value: "Ms",
      },
      {
        id: "miss",
        value: "Miss",
      },
      {
        id: "mrs",
        value: "Mrs",
      },
    ],
    dependentsRadioData: [
      {
        id: "zero",
        value: "0",
      },
      {
        id: "one",
        value: "1",
      },
      {
        id: "two",
        value: "2",
      },
      {
        id: "three",
        value: "3",
      },
      {
        id: "four",
        value: "4",
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
                    <h3 className="comm-hdn">About you</h3>
                    <div className="comm-para">
                      <p>Tells us about yourself</p>
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
                    <p className="form-quest rm-for-mob">What’s your email?</p>
                    <div className="form-grp-field">
                      <div className="form-grp">
                        <input
                          className="form-field"
                          type="email"
                          id="emailaddress"
                          name="emailaddress"
                          defaultValue={email}
                          {...register("emailaddress", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                              message: "Enter a valid Email",
                            },
                          })}
                        />
                        <p className="form-label">Email address</p>
                      </div>
                      {errors.emailaddress && (
                        <ErrorMsgComp
                          errorMessage={errors.emailaddress.message}
                        />
                      )}
                    </div>
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest rm-for-mob">What’s your title?</p>
                    <div className="title-chk">
                      {/* start */}
                      {aboutRadioData?.titleRadioData?.map(item => (
                        <RadioButton
                          key={item?.id}
                          id={item?.id}
                          name="titleRadio"
                          title={item?.value}
                          value={item?.value}
                          defaultChecked={item?.value === title}
                          register={register}
                          rules={{ required: true }}
                        />
                      ))}
                      {/* end */}
                    </div>
                    {errors.titleRadio?.type === "required" && (
                      <ErrorMsgComp errorMessage={"Title is required"} />
                    )}
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest rm-for-mob">What’s your name?</p>
                    <div className="multi-form-field mb0">
                      <div className="form-grp-field">
                        <div className="form-grp">
                          <input
                            className="form-field"
                            type="text"
                            id="firstname"
                            name="firstname"
                            defaultValue={firstName}
                            {...register("firstname", {
                              required: "First name is required",
                              pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "Enter a valid name",
                              },
                            })}
                          />
                          <p className="form-label">First name</p>
                        </div>
                        {errors.firstname && (
                          <ErrorMsgComp
                            errorMessage={errors.firstname.message}
                          />
                        )}
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp">
                          <input
                            className="form-field"
                            type="text"
                            id="lastname"
                            name="lastname"
                            defaultValue={lastName}
                            {...register("lastname", {
                              required: "Last name is required",
                              pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "Enter a valid name",
                              },
                            })}
                          />
                          <p className="form-label">Last name</p>
                        </div>
                        {errors.lastname && (
                          <ErrorMsgComp
                            errorMessage={errors.lastname.message}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">Date of birth</p>
                    <div className="f-row custm-frow">
                      <div className="w25">
                        <div className="form-grp-field">
                          <div className="form-grp sTop">
                            <p className="form-label">DD</p>
                            {/* <Controller
                              name={"birthDate"}
                              control={control}
                              // defaultValue={startDate}
                              render={({ field: { onChange, value } }) =>
                                <DatePicker
                                  className={'form-field'}
                                  onChange={(e) => {
                                    onChange(e);
                                    startDateFunc(e);
                                  }}
                                  // selected={startDate}
                                  selected={value}
                                  value={dateMoment === "Invalid date" ? null : dateMoment}
                                  dateFormat="dd"
                                  autoComplete="off"
                                // onKeyDown={(e) => {
                                //   e.preventDefault();
                                // }}
                                />
                              }
                            /> */}

                            {/* <DatePicker
                              className="form-field"
                              selected={startDate}
                              dateFormat="dd"
                              autoComplete="off"
                              // maxDate={new Date()}
                              onChange={(date) => setStartDate(date)}
                            /> */}

                            <div className="form-grp-field date-field">
                              <div className="form-grp">
                                <select
                                  className="select-field form-field"
                                  id="select-fld"
                                  name="startDate"
                                  // {...register("startDate", {
                                  //   required: "This field is required",
                                  // })}
                                  defaultValue={dateMoment}
                                  onChange={(e) => startDateFunc(e.target)}
                                >
                                  <option value=""></option>
                                  <option value="01">1</option>
                                  <option value="02">2</option>
                                  <option value="03">3</option>
                                  <option value="04">4</option>
                                  <option value="05">5</option>
                                  <option value="06">6</option>
                                  <option value="07">7</option>
                                  <option value="08">8</option>
                                  <option value="09">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                  <option value="31">31</option>
                                </select>
                                {/* <p className="form-label">1st of every month</p> */}
                              </div>
                              {/* {errors.getpaid &&
                                <ErrorMsgComp errorMessage={errors.getpaid.message} />
                              } */}
                              {/* end */}
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="w25">
                        <div className="form-grp-field">
                          <div className="form-grp sTop">
                            <p className="form-label">MM</p>
                            <Controller
                              name={"birthMonth"}
                              control={control}
                              // defaultValue={startDate}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <DatePicker
                                    className={`form-field ${startMonth ? "field--not-empty" : null}`}
                                    onChange={(e) => {
                                      onChange(e);
                                      startMonthFunc(e);
                                    }}
                                    calendarClassName="removeYear"
                                    // selected={startMonth}
                                    selected={value}
                                    value={monthMoment === "Invalid date" ? null : monthMoment}
                                    showMonthYearPicker
                                    showFullMonthYearPicker
                                    dateFormat="MM"
                                    autoComplete="off"
                                  // placeholderText="MM"
                                  />
                                );
                              }}
                            />
                            {/* <DatePicker
                              className="form-field"
                              selected={startMonth}
                              dateFormat="MM"
                              autoComplete="off"
                              showMonthYearPicker
                              showFullMonthYearPicker
                              // maxDate={new Date()}
                              onChange={(date) => setStartMonth(date)}
                            /> */}
                          </div>
                        </div>
                      </div>
                      <div className="w50">
                        <div className="form-grp-field">
                          <div className="form-grp sTop">
                            <p className="form-label">YYYY</p>
                            <Controller
                              name={"birthYear"}
                              control={control}
                              // defaultValue={startDate}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <DatePicker
                                    className={`form-field ${startYear ? "field--not-empty" : null}`}
                                    onChange={(e) => {
                                      onChange(e);
                                      startYearFunc(e);
                                    }}
                                    // selected={startYear}
                                    selected={value}
                                    value={yearMoment === "Invalid date" ? null : yearMoment}
                                    maxDate={new Date(yearStart)}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    autoComplete="off"
                                  // placeholderText="YYYY"
                                  />
                                );
                              }}
                            />
                            {/* <DatePicker
                              className="form-field"
                              selected={startYear}
                              dateFormat="yyyy"
                              autoComplete="off"
                              showYearPicker
                              maxDate={new Date(yearStart)}
                              onChange={(date) => setStartYear(date)}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {(errors.birthDate || errors.birthMonth || errors.birthYear) && (
                      <ErrorMsgComp
                        errorMessage={"Date of birth is required"}
                      />
                    )}
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">Number of dependents ?</p>
                    <div className="title-chk">
                      {/* start */}
                      {aboutRadioData?.dependentsRadioData?.map(item => (
                        <RadioButton
                          key={item?.id}
                          id={item?.id}
                          name="dependentsRadio"
                          title={item?.value === "4" ? "4+" : item?.value}
                          value={item?.value}
                          defaultChecked={item?.value === numberOfDependents}
                          register={register}
                          rules={{ required: true }}
                        />
                      ))}
                      {/* end */}
                    </div>
                    {errors.dependentsRadio?.type === "required" && (
                      <ErrorMsgComp errorMessage={"Dependents is required"} />
                    )}
                  </div>
                  {/* end */}

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

export default WelcomeStep1;
