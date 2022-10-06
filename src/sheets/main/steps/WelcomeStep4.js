import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';
import AuthContext from '../../../store/auth-context';
import axios from 'axios';
import gs from '../../../service/global';
import { toast } from 'react-toastify';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const WelcomeStep4 = () => {
  const authCtx = useContext(AuthContext);
  var instanceId = authCtx?.instanceId;
  // console.log(instanceId);


  /* steps */
  const [steps, setSteps] = useState(3);
  setTimeout(() => {
    setSteps(4)
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */


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


  /* Post data */
  const onSubmit = (data) => {
    let inputData = data;
    // console.log(inputData);

    let sortcodeData = inputData?.sccodeOne + inputData?.sccodeTwo + inputData?.sccodeThree;

    let payload = {
      "action": "submit",
      "data": {
        "accountNumber": inputData?.account,
        "sortCode": sortcodeData,
        "amount": authCtx?.amountSlideValue,
        "duration": authCtx?.periodSlideValue,
      }
    }

    let bankdetail = {
      key: "c9b13-fd9fb-cf970-0839a",
      sortCode: sortcodeData,
      accountNumber: inputData?.account,
    }
    axios.post(`https://api.craftyclicks.co.uk/bank/1.1/validate`, bankdetail)
      .then((response) => {
        const result = response;
        console.log(result?.data);
        bankPayload(payload);

        toast.success('Successfully added bank detail', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })
      .catch((error) => {
        console.log(error);

        toast.error('Enter bank detail is invalid!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      });

    // navigate("/almost-done", { replace: true });
  }


  const bankPayload = (params) => {
    console.log(params);

    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, params)
      .then((response) => {
        const result = response?.data;
        authCtx.currentStepFunc(result?.currentStepId);
        console.log(result);


        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */


        // redirect to Address Lookup 
        // navigate("/almost-done", { replace: true });
      })
      .catch((error) => {
        console.log(error);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

      });
  }
  /* Post data end */



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
        <div className="banner-top-img inner-bg-img add-bg-mob" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.png')` }}>
        </div>
        <div className="container">
          {/* start */}
          <div className="welcome-box">
            <div className="welcome-right">

              {/* start */}
              <MontlyPaymentComp />
              {/* end */}

            </div>
            <div className="welcome-left">
              {/* start */}
              <div className="comm-box">
                <div className="comm-hdn-slide">
                  <div className="comm-hdn-box">
                    <h3 className="comm-hdn">
                      Your bank details
                    </h3>
                    <div className="comm-para">
                      <p>We'll transfer the loan's money into the provided bank account.</p>
                    </div>
                  </div>
                  <div className="comm-step">
                    {/* <img src={`${REACT_APP_PUBLIC_URL}/img/steps.png`} alt="" /> */}

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
                    {/* start */}
                    <div className="form-grp-field form-mb">
                      <div className="form-grp">
                        <input
                          className="form-field"
                          type="number"
                          id="account"
                          name="account"
                          {...register("account", {
                            required: "Account number is required",
                          })}
                        />
                        <p className="form-label">Account number</p>
                      </div>
                      {errors.account &&
                        <div className="form-input-error">
                          <i className="icon-input-error"></i>
                          <p>{errors.account.message}</p>
                        </div>
                      }
                    </div>
                    {/* end */}
                    <div className="sortcode">
                      {/* start */}
                      <div className="form-grp-field">
                        <div className="form-grp">
                          <input
                            className="form-field"
                            type="number"
                            id="sccodeOne"
                            name="sccodeOne"
                            maxLength="2"
                            size="2"
                            {...register("sccodeOne", {
                              required: true
                            })}
                          />
                        </div>
                      </div>
                      {/* end */}
                      <div className='lineInput'>
                        -
                      </div>
                      {/* start */}
                      <div className="form-grp-field">
                        <div className="form-grp">
                          <input
                            className="form-field"
                            type="number"
                            id="sccodeTwo"
                            name="sccodeTwo"
                            maxLength="2"
                            {...register("sccodeTwo", {
                              required: true
                            })}
                          />
                        </div>
                      </div>
                      {/* end */}
                      <div className='lineInput'>
                        -
                      </div>
                      {/* start */}
                      <div className="form-grp-field">
                        <div className="form-grp">
                          <input
                            className="form-field"
                            type="number"
                            id="sccodeThree"
                            name="sccodeThree"
                            maxLength="2"
                            {...register("sccodeThree", {
                              required: true
                            })}
                          />
                        </div>
                      </div>
                      {/* end */}
                    </div>
                    {(errors.sccodeOne || errors.sccodeTwo || errors.sccodeThree) &&
                      <div className="form-input-error">
                        <i className="icon-input-error"></i>
                        <p>Sortcode is required</p>
                      </div>
                    }
                  </div>
                  {/* <div class="comm-disclaim">
                        <p>
                            By submitting this form, you agree to the automatic processing of your data. We’ll use
                            your details to send information about our products and special offers. We’ll never
                            share your details with third parties without your permission and you can opt out at any
                            time.
                        </p>
                    </div> */}
                  {/* [disabled] */}
                  <button className="button button--block">Complete your application</button>
                </form>

              </div>
              {/* end */}
            </div>
          </div>
          {/* end */}
        </div>
      </div>
      {/* Main Container Ends */}
    </div>

  )
}

export default WelcomeStep4
