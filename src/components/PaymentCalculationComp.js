import React, { useCallback, useContext, useEffect, useState } from "react";

/* plugin */
import Slider from "react-rangeslider";
import { useForm } from "react-hook-form";
import axios from "axios";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { toasterConfig } from "../config/Constant";
/* plugin end */

/* service */
import AuthContext from "../store/auth-context";
import gs from "../service/global";
/* service end */


const PaymentCalculationComp = ({ getMonthly }) => {
  const authCtx = useContext(AuthContext);
  const productUrlLink = authCtx?.productUrl;
  // console.log('authCtx', authCtx);

  const {
    register,
    watch,
    // handleSubmit,
    formState: { errors },
    setValue,
    // setFocus
  } = useForm({
    mode: "all",
    // mode: "onBlur",

    defaultValues: {
      amount: authCtx?.amountSlideValue,
      period: authCtx?.periodSlideValue,
    },
  });

  /* payment calculation */

  /* range slider */
  const [amtSlideValue, setAmtSlideValue] = useState(authCtx?.amountSlideValue);
  const [periodSlideValue, setPeriodSlideValue] = useState(
    authCtx?.periodSlideValue
  );

  const [productAmount, setProductAmount] = useState(authCtx?.amountSlideValue);
  const [productPeriod, setProductPeriod] = useState(
    authCtx?.periodSlideValueMonth
  );

  const [durationArray, setDurationArray] = useState([]);

  const handleChangeLoan = (value) => {
    // console.log(value);
    setValue("amount", value);
    setAmtSlideValue(value);
  };

  const handleChangePeriod = (value) => {
    // console.log(value);
    setValue("period", value);
    setPeriodSlideValue(value);
  };

  /* send calculated value */
  const handleChangeCompleteLoan = () => {
    localStorage.setItem("amount", amtSlideValue);
    setValue("amount", amtSlideValue);
    // console.log(amtSlideValue);

    setProductAmount(amtSlideValue);

    /* context amount */
    authCtx.createAmountValueFunc(amtSlideValue);
    /* context amount end */
  };

  const handleChangeCompletePeriod = () => {
    localStorage.setItem("period", periodSlideValue);
    setValue("period", periodSlideValue);
    // console.log(periodSlideValue);

    let periodMonthValue = periodSlideValue * 30;
    setProductPeriod(periodMonthValue);

    /* context period */
    authCtx.createPeriodValueFunc(periodSlideValue);
    /* context period end */
  };
  /* send calculated value */

  /* product api */
  useEffect(() => {
    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    const productBaseUrl = `/offer/product?offerId=${authCtx?.offerData?.name}&amount=${productAmount}&duration=${productPeriod}`;

    const productPostLink = productUrlLink ? `${productBaseUrl}${productUrlLink}` : `${productBaseUrl}`;

    axios
      .get(productPostLink)
      .then((response) => {
        const result = response?.data;
        // console.log(result);
        authCtx.paymentDataFunc(result);

        if (result?.error) {
          // console.log(result?.error);
          const errorText = `${result?.error}, please change the value for Loan amount and Period.`;

          toast.error(errorText, toasterConfig);
        }
        // else {
        //   toast.dismiss();
        // }

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
  }, [productAmount, productPeriod]);

  /* product api end */

  /* onchange function */
  const getAmtValue = useCallback(
    debounce((value) => {
      // console.log(value);
      setProductAmount(value);
    }, 600),
    []
  );

  const getPeriodValue = useCallback(
    debounce((value) => {
      // console.log(value);
      const ptm = value * 30;
      setProductPeriod(ptm);
    }, 600),
    []
  );
  /* onchange function end */

  useEffect(() => {
    const dateRange = authCtx?.offerData?.durationRange;
    let durationArr = [];
    for (let itemData of dateRange) {
      const result = itemData.slice(0, -1);
      durationArr.push(+result);
    }
    setDurationArray(durationArr);
  }, []);

  useEffect(() => {
    const subscription = watch((data) => {
      // console.log(parseFloat(data?.amount));

      /* amount slide */
      setAmtSlideValue(parseFloat(data?.amount));
      authCtx.createAmountValueFunc(parseFloat(data?.amount));
      /* amount slide end */

      /* period slide */
      setPeriodSlideValue(parseFloat(data?.period));
      authCtx.createPeriodValueFunc(parseFloat(data?.period));
      /* period slide end */
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  /* range slider end */

  /* payment calculation end */

  return (
    <>
      <div className="rnge-slide-box">
        <div className="rnge-slide">
          <div className="rnge-top">
            <h6 className="rnge-hdn">Loan amount</h6>
            <div className="form-grp form-inp-txt amt-slider">
              <input
                className="form-field"
                type="number"
                onWheel={(e) => e.target.blur()}
                min={authCtx?.offerData?.amountRange[0]}
                max={
                  authCtx?.offerData?.amountRange[
                  authCtx?.offerData?.amountRange?.length - 1
                  ]
                }
                id="amount"
                name="amount"
                // step="10"
                // value={amtSlideValue}
                autoComplete="off"
                {...register("amount", {
                  required: "Amount is required",
                  min: authCtx?.offerData?.amountRange[0],
                  max: authCtx?.offerData?.amountRange[
                    authCtx?.offerData?.amountRange?.length - 1
                  ],
                })}
                onInput={(e) => getAmtValue(e.target.value)}
              />
              {/* <p className="form-label">First Name</p> */}
              <em>£</em>
            </div>
          </div>
          <div className="drag-slide">
            <Slider
              min={authCtx?.offerData?.amountRange[0]}
              max={
                authCtx?.offerData?.amountRange[
                authCtx?.offerData?.amountRange?.length - 1
                ]
              }
              value={amtSlideValue}
              tooltip={false}
              step={10}
              onChange={handleChangeLoan}
              onChangeComplete={handleChangeCompleteLoan}
            />
          </div>
          <div className="rnge-btm">
            <p>£{authCtx?.offerData?.amountRange[0]}</p>
            <p>
              £
              {
                authCtx?.offerData?.amountRange[
                authCtx?.offerData?.amountRange?.length - 1
                ]
              }
            </p>
          </div>
          {errors.amount && (
            <div className="form-input-error">
              <i className="icon-input-error"></i>
              <p>
                The number should be between{" "}
                {authCtx?.offerData?.amountRange[0]} and{" "}
                {
                  authCtx?.offerData?.amountRange[
                  authCtx?.offerData?.amountRange?.length - 1
                  ]
                }
              </p>
            </div>
          )}
        </div>

        <div className="rnge-slide">
          <div className="rnge-top">
            <h6 className="rnge-hdn">Period</h6>
            <div className="form-grp amt-slider">
              <input
                className="form-field"
                type="number"
                onWheel={(e) => e.target.blur()}
                min={durationArray[0]}
                max={durationArray[durationArray.length - 1]}
                id="period"
                name="period"
                // value={periodSlideValue}
                autoComplete="off"
                {...register("period", {
                  required: "Period is required",
                  min: durationArray[0],
                  max: durationArray[durationArray.length - 1],
                })}
                onInput={(e) => getPeriodValue(e.target.value)}
              />
            </div>
          </div>
          <div className="drag-slide">
            <Slider
              min={durationArray[0]}
              max={durationArray[durationArray.length - 1]}
              value={periodSlideValue}
              tooltip={false}
              onChange={handleChangePeriod}
              onChangeComplete={handleChangeCompletePeriod}
            />
          </div>
          <div className="rnge-btm">
            <p>{durationArray[0]} months</p>
            <p>{durationArray[durationArray.length - 1]} months</p>
          </div>
          {errors.period && (
            <div className="form-input-error">
              <i className="icon-input-error"></i>
              <p>
                The number should be between {durationArray[0]} and{" "}
                {durationArray[durationArray.length - 1]}
              </p>
            </div>
          )}
        </div>
      </div>

      {getMonthly && (
        <div className="rnge-total">
          <h6 className="rnge-total-hdn">Estimated monthly payment</h6>
          <h6 className="rnge-total-price">
            £
            {authCtx?.paymentData?.installmentAmount
              ? Number(authCtx?.paymentData?.installmentAmount).toFixed(2)
              : ""}
          </h6>
        </div>
      )}
    </>
  );
};

export default PaymentCalculationComp;
