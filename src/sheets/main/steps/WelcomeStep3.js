import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';
import gs from '../../../service/global';
import axios from 'axios';
import AuthContext from '../../../store/auth-context';
import { toast } from 'react-toastify';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const WelcomeStep3 = () => {
  const authCtx = useContext(AuthContext);
  var instanceId = authCtx?.instanceId;
  // console.log(instanceId);

  /* steps */
  const [steps, setSteps] = useState(2);
  setTimeout(() => {
    setSteps(3)
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */

  /* usestate */
  const [employedRadio, setEmployedRadio] = useState('fulltime');
  /* usestate end */

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
    console.log(inputData);

    let payload = {
      "action": "submit",
      "data": {
        "employmentStatus": employedRadio,
        "organization": inputData?.organization,
        "netMonthlyIncome": inputData?.monthincome,
        "monthlyCouncilTax": inputData?.council,
        "monthlyUtilities": inputData?.utilities,
        "monthlyRentMortgage": inputData?.rent,
        "monthlyGroceries": inputData?.groceries,
        "monthlyTransport": inputData?.transport,
        "monthlyOthers": inputData?.expenses,
        "amount": authCtx?.amountSlideValue + "",
        "duration": authCtx?.periodSlideValue + "",
      }
    }
    console.log(payload);

    /* Loader Starts */
    // gs.showLoader(true);
    /* Loader Ends */

    // axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
    //   .then((response) => {
    //     const result = response?.data;
    //     AuthContext.currentStepFunc(result?.currentStepId);
    //     console.log(result);

    //     /* Loader Starts */
    //     gs.showLoader(false);
    //     /* Loader Ends */

    //     // redirect to Bank Details 
    // navigate("/bank-details", { replace: true });
    //   })
    //   .catch((error) => {
    //     console.log(error);

    // /* Loader Starts */
    // gs.showLoader(false);
    // /* Loader Ends */

    //     toast.error('Something went wrong!', {
    //       position: "top-right",
    //       autoClose: 4000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });

    //   });


  }
  /* Post data end */



  /* get radio data */
  const employedRadioFun = (value) => {
    console.log(value);
    setEmployedRadio(value);
  }

  /* get radio data end */


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
                      Your finances
                    </h3>
                    <div className="comm-para">
                      <p>Tells us about your employment and financial status.</p>
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
                    <p className="form-quest">Are you employed?</p>
                    <div className="mob-full-chk">
                      {/* start */}
                      <div className="checkbox-box check-three">
                        <input
                          type="radio"
                          name="empstatus"
                          id="fulltime"
                          value="fulltime"
                          defaultChecked={employedRadio === 'fulltime'}
                          onClick={(e) => employedRadioFun(e.target.value)}
                        />
                        <label className="chk-label" htmlFor="fulltime">
                          <span> Full-time employed </span>
                        </label>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="checkbox-box check-three">
                        <input
                          type="radio"
                          name="empstatus"
                          id="parttime"
                          value="parttime"
                          defaultChecked={employedRadio === 'parttime'}
                          onClick={(e) => employedRadioFun(e.target.value)}
                        />
                        <label className="chk-label" htmlFor="parttime">
                          <span> Part-time employed </span>
                        </label>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="checkbox-box check-three">
                        <input
                          type="radio"
                          name="empstatus"
                          id="selfemp"
                          value="selfemp"
                          defaultChecked={employedRadio === 'selfemp'}
                          onClick={(e) => employedRadioFun(e.target.value)}
                        />
                        <label className="chk-label" htmlFor="selfemp">
                          <span> Self-employed </span>
                        </label>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="checkbox-box check-three">
                        <input
                          type="radio"
                          name="empstatus"
                          id="other"
                          value="other"
                          defaultChecked={employedRadio === 'other'}
                          onClick={(e) => employedRadioFun(e.target.value)}
                        />
                        <label className="chk-label" htmlFor="other">
                          <span> Other </span>
                        </label>
                      </div>
                      {/* end */}
                    </div>
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
                          {...register("organization", {
                            required: "Organization is required",
                          })}
                        />
                        <p className="form-label">Employer / Organization name</p>
                      </div>
                      {errors.organization &&
                        <div className="form-input-error">
                          <i className="icon-input-error"></i>
                          <p>{errors.organization.message}</p>
                        </div>
                      }
                    </div>
                  </div>
                  {/* end */}


                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">What's your net monthly income?</p>
                    <div className="form-grp-field">
                      <div className="form-grp form-inp-txt">
                        <input
                          className="form-field"
                          type="number"
                          id="monthincome"
                          name="monthincome"
                          {...register("monthincome", {
                            required: "Monthly income is required"
                          })}
                        />
                        <p className="form-label">£</p>
                        <em>£</em>
                      </div>
                      {errors.monthincome &&
                        <div className="form-input-error">
                          <i className="icon-input-error"></i>
                          <p>{errors.monthincome.message}</p>
                        </div>
                      }
                    </div>
                  </div>
                  {/* end */}


                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">How much do you spend per month?</p>
                    <div className="multi-form-field mb0">
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            id="council"
                            name="council"
                            {...register("council", {
                              required: "Council is required",
                              // pattern: {
                              //   value: /^[0-9]*$/,
                              //   message: "Enter a valid number"
                              // }
                            })}
                          />
                          <p className="form-label">Council Tax (£) </p>
                          <em>£</em>
                        </div>
                        {errors.council &&
                          <div className="form-input-error">
                            <i className="icon-input-error"></i>
                            <p>{errors.council.message}</p>
                          </div>
                        }
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            id="utilities"
                            name="utilities"
                            {...register("utilities", {
                              required: "Utilities is required"
                            })}
                          />
                          <p className="form-label">Utilities (£) </p>
                          <em>£</em>
                        </div>
                        {errors.utilities &&
                          <div className="form-input-error">
                            <i className="icon-input-error"></i>
                            <p>{errors.utilities.message}</p>
                          </div>
                        }
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            id="rent"
                            name="rent"
                            {...register("rent", {
                              required: "Rent is required"
                            })}
                          />
                          <p className="form-label">Rent / Mortgage (£) </p>
                          <em>£</em>
                        </div>
                        {errors.rent &&
                          <div className="form-input-error">
                            <i className="icon-input-error"></i>
                            <p>{errors.rent.message}</p>
                          </div>
                        }
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            id="groceries"
                            name="groceries"
                            {...register("groceries", {
                              required: "Groceries is required"
                            })}
                          />
                          <p className="form-label">Groceries (£) </p>
                          <em>£</em>
                        </div>
                        {errors.groceries &&
                          <div className="form-input-error">
                            <i className="icon-input-error"></i>
                            <p>{errors.groceries.message}</p>
                          </div>
                        }
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            id="transport"
                            name="transport"
                            {...register("transport", {
                              required: "Transport is required"
                            })}
                          />
                          <p className="form-label">Transport (£) </p>
                          <em>£</em>
                        </div>
                        {errors.transport &&
                          <div className="form-input-error">
                            <i className="icon-input-error"></i>
                            <p>{errors.transport.message}</p>
                          </div>
                        }
                      </div>
                      <div className="form-grp-field">
                        <div className="form-grp form-inp-txt">
                          <input
                            className="form-field"
                            type="number"
                            id="expenses"
                            name="expenses"
                            {...register("expenses", {
                              required: "Other committed expenses is required"
                            })}
                          />
                          <p className="form-label">Other committed expenses (£) </p>
                          <em>£</em>
                        </div>
                        {errors.expenses &&
                          <div className="form-input-error">
                            <i className="icon-input-error"></i>
                            <p>{errors.expenses.message}</p>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  {/* end */}


                  {/* start */}
                  {/* <div class="form-grp-box">
                        <p class="form-quest">Are you expecting a significant income decrease in the recent future?
                        </p>
  
                        <div class="title-chk">
                            <div class="checkbox-box check-three">
                                <input type="checkbox" id="income1" name="income" required />
                                <label class="chk-label" for="income1">
                                    <span> Yes </span>
                                </label>
                            </div>
                            <div class="checkbox-box check-three">
                                <input type="checkbox" id="income2" name="income" required />
                                <label class="chk-label" for="income2">
                                    <span> No </span>
                                </label>
                            </div>
                        </div>
                    </div> */}
                  {/* end */}
                  {/* <div class="comm-disclaim">
                        <p>
                            Amount of credit £900 over 12 months. Interest £398.81. Interest rate 73% pa (fixed),
                            0.2% per day of the amount borrowed. Repay with 12 equal instalments of £108.23. Total
                            amount payable 1298.81. Representative 100.96%.
                        </p>
                    </div> */}


                  {/* [disabled] */}
                  <button className="button button--block" >Continue</button>
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

export default WelcomeStep3
