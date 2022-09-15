import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import LoanCalComp from '../../../components/LoanCalComp'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';

const { REACT_APP_PUBLIC_URL } = process.env;

const WelcomeStep4 = () => {

  /* steps */
  const [steps, setSteps] = useState(3);
  setTimeout(() => {
    setSteps(4)
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // mode: "onBlur",
    mode: "all",
  });


  const onSubmit = (data) => {
    let payload = data;
    console.log(payload);

    navigate("/almost-done", { replace: true });
  }



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
                    <div className="f-row custm-frow">
                      <div className="w33">
                        {/* start */}
                        <div className="form-grp-field">
                          <div className="form-grp">
                            <input
                              className="form-field"
                              type="number"
                              id="ddcard"
                              name="ddcard"
                              {...register("ddcard", {
                                required: "Date is required",
                              })}
                            />
                            <p className="form-label">DD</p>
                          </div>
                          {errors.ddcard &&
                            <div className="form-input-error">
                              <i className="icon-input-error"></i>
                              <p>{errors.ddcard.message}</p>
                            </div>
                          }
                        </div>
                        {/* end */}
                      </div>
                      <div className="w33">
                        {/* start */}
                        <div className="form-grp-field">
                          <div className="form-grp">
                            <input
                              className="form-field"
                              type="number"
                              id="mmcard"
                              name="mmcard"
                              {...register("mmcard", {
                                required: "Month is required",
                              })}
                            />
                            <p className="form-label">MM</p>
                          </div>
                          {errors.mmcard &&
                            <div className="form-input-error">
                              <i className="icon-input-error"></i>
                              <p>{errors.mmcard.message}</p>
                            </div>
                          }
                        </div>
                        {/* end */}
                      </div>
                      <div className="w33">
                        {/* start */}
                        <div className="form-grp-field">
                          <div className="form-grp">
                            <input
                              className="form-field"
                              type="number"
                              id="cvcard"
                              name="cvcard"
                              {...register("cvcard", {
                                required: "CV is required",
                              })}
                            />
                            <p className="form-label">CV</p>
                          </div>
                          {errors.cvcard &&
                            <div className="form-input-error">
                              <i className="icon-input-error"></i>
                              <p>{errors.cvcard.message}</p>
                            </div>
                          }
                        </div>
                        {/* end */}
                      </div>
                    </div>
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
