import React, { useContext, useEffect, useRef, useState } from 'react'

/* plugin */
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
/* plugin end */

/* service */
import formService from '../../../service/formService';
import AuthContext from '../../../store/auth-context';
import { stepFun, toasterConfig } from '../../../config/Constant';
import gs from '../../../service/global';
/* service end */

/* component */
import Header from '../../../components/Header'
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';
import ErrorMsgComp from '../../../components/ErrorMsgComp';
import InnerBgComp from '../../../components/InnerBgComp';
/* component end */

const { REACT_APP_FLOWID, REACT_APP_FETCHIFYKEY } = process.env;

let currentSortCodeIndex = 0;

const WelcomeStep4 = () => {
  const authCtx = useContext(AuthContext);
  // console.log("welcomeStep4:", authCtx);
  const instanceId = authCtx?.instanceId;
  var prefilledData = authCtx?.prefilledData || {};
  // console.log(instanceId);


  /* steps */
  const [steps, setSteps] = useState(3);
  setTimeout(() => {
    setSteps(4)
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */

  /* predfilled */
  const {
    accountNumber
  } = prefilledData;
  let shortCodeData = prefilledData?.sortCode;
  let shortCodeArray = shortCodeData && shortCodeData.match(/.{1,2}/g);
  // console.log(shortCodeArray);
  /* predfilled end */

  const navigate = useNavigate();

  /* react-form-hook */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // mode: "onBlur",
    mode: "all",
  });
  /* react-form-hook end */

  const fetchifyKey = REACT_APP_FETCHIFYKEY;

  /* Post data */
  const onSubmit = (data) => {
    let inputData = data;
    // console.log(data);
    const addedNewSc = sortCode && sortCode.join('');
    const prefilledSc = shortCodeArray && shortCodeArray.join('');
    // console.log(addedNewSc, prefilledSc);


    /* api call */
    let payload = {
      "action": "submit",
      "data": {
        "accountNumber": inputData?.account,
        "sortCode": addedNewSc ? addedNewSc : prefilledSc,
        // "sortCode": inputData?.sortCode,
        "amount": authCtx?.amountSlideValue,
        "duration": authCtx?.periodSlideValueMonth,
      }
    }
    // console.log(payload);

    let bankdetail = {
      key: fetchifyKey,
      sortCode: addedNewSc ? addedNewSc : prefilledSc,
      // sortCode: inputData?.sortCode,
      accountNumber: inputData?.account,
    }
    axios.post(`https://api.craftyclicks.co.uk/bank/1.1/validate`, bankdetail)
      .then((response) => {
        // const result = response;
        // console.log(result?.data);
        // console.log(payload)
        bankPayload(payload);


      })
      .catch((error) => {
        console.log(error);
        const errorResult = error?.response?.data?.error;
        // console.log(errorResult);

        toast.error(errorResult, toasterConfig);

      });
    /* api call end */

    // navigate("/almost-done", { replace: true });
  }


  const bankPayload = (params) => {
    // console.log(params);

    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, params)
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
        const arrayFlatten = arrayOfString.flat()
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
  }
  /* Post data end */




  /* sortcode */
  const [sortCodeError, setSortCodeError] = useState(false);
  const [sortCode, setSortCode] = useState(new Array(3).fill(''));
  const [activeSortCodeIndex, setActiveSortCodeIndex] = useState(null);


  const inputRef = useRef(null);
  const handleOnChange = (e) => {
    const value = e.target.value;
    // console.log(value);
    const newSortCode = [...sortCode];
    // newSortCode[currentSortCodeIndex] = value.substring(Math.max(value.length - 2, 0));
    newSortCode[currentSortCodeIndex] = value.substring(value.length - 2);


    // inputRef.current?.focus();

    if (value === '') {
      setSortCodeError(true);
    } else {
      setSortCodeError(false);
    }

    if (!value) {
      setActiveSortCodeIndex(currentSortCodeIndex - 1);
    }
    else {
      setActiveSortCodeIndex(currentSortCodeIndex + 1);
    }

    setSortCode(newSortCode);
  }
  // console.log(sortCode);


  const handleOnKeyDown = (e, index) => {
    const value = e.target.value;
    const key = e.key;
    // console.log(key);
    currentSortCodeIndex = index;

    if (key === 'Backspace' && value.length === 0) {
      setActiveSortCodeIndex(currentSortCodeIndex - 1);
    }

  }

  useEffect(() => {
    // console.log(activeSortCodeIndex);

    setTimeout(() => {
      // console.log('focus');
      inputRef.current?.focus();
    }, 800);

  }, [activeSortCodeIndex])
  /* sortcode end */


  useEffect(() => {

    /* form service */
    formService.inputEmptyCheck();
    /* form service end */

  }, [])


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
              className="welcome-left">
              {/* start */}
              <div className="comm-box">
                <div className="comm-hdn-slide">
                  <div className="comm-hdn-box">
                    <h3 className="comm-hdn">
                      Where do we send money?
                    </h3>
                    <div className="comm-para">
                      <p>Please give us your UK bank details.</p>
                    </div>
                  </div>
                  <div className="comm-step">

                    <CircularProgressbar
                      strokeWidth={8}
                      value={percentage}
                      text={`${steps}/4`}


                      styles={buildStyles({
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',

                        // Text size
                        textSize: '22px',

                        // Colors
                        pathColor: `rgba(0, 230, 210, 1)`,
                        textColor: '#938E9E',
                        trailColor: '#F8F7F9',
                      })}
                    />

                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">Account number</p>
                    {/* start */}
                    <div className="form-grp-field">
                      <div className="form-grp">
                        <input
                          className="form-field"
                          type="number"
                          onWheel={(e) => e.target.blur()}
                          id="account-number"
                          name="account"
                          defaultValue={accountNumber}
                          {...register("account", {
                            required: "Account number is required",
                            minLength: {
                              value: 8,
                              message: "Account number must consist of 8 digits."
                            },
                            maxLength: {
                              value: 8,
                              message: "Account number must consist of 8 digits."
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "Enter a valid account number.",
                            },
                          })}
                        />
                        <p className="form-label">UK bank account number</p>
                      </div>
                      {errors.account &&
                        <ErrorMsgComp errorMessage={errors.account.message} />
                      }
                    </div>
                    {/* end */}
                  </div>
                  {/* end */}

                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">Sort code</p>

                    <div className="sortcode">
                      {sortCode.map((_, index) => {
                        return (
                          <React.Fragment key={index}>
                            <input
                              className="form-field sortcodeInput"
                              type="number"
                              // ref={inputRef}
                              ref={index === activeSortCodeIndex ? inputRef : null}
                              // id="sortcode"
                              // name="sortcode"
                              maxLength="2"
                              // size="2"
                              // {...register("sortcode", {
                              //   required: true
                              // })}
                              // value={shortCodeArray ? shortCodeArray[index] : sortCode[index]}
                              value={sortCode[index]}
                              onChange={(e) => handleOnChange(e)}
                              onKeyDown={(e) => handleOnKeyDown(e, index)}
                            />
                            {index === (sortCode.length - 1) ? null : (
                              <div className='lineInput'>
                                -
                              </div>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </div>
                    {sortCodeError &&
                      <ErrorMsgComp errorMessage={"Sortcode is required"} />
                    }

                  </div>
                  {/* end */}

                  {/* [disabled] */}
                  <button className="button button--block">Complete your application</button>
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

  )
}

export default WelcomeStep4
