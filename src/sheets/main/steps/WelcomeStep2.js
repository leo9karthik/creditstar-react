import React, { useContext, useEffect, useState } from "react";

/* plugin */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { motion } from "framer-motion";
/* plugin end */

/* service */
import AuthContext from "../../../store/auth-context";
import gs from "../../../service/global";
import formService from "../../../service/formService";
import { toasterConfig } from "../../../config/Constant";
/* service end */

/* component */
import Header from "../../../components/Header";
import MontlyPaymentComp from "../../../components/MontlyPaymentComp";
import RadioButton from "../../../components/base/RadioButton";
import InnerBgComp from "../../../components/InnerBgComp";
import ErrorMsgComp from "../../../components/ErrorMsgComp";
/* component end */

const { REACT_APP_FETCHIFYKEY } = process.env;

const WelcomeStep2 = () => {
  const authCtx = useContext(AuthContext);
  // console.log("welcomeStep2:", authCtx);
  var prefilledData = authCtx?.prefilledData || {};

  /* steps */
  const [steps, setSteps] = useState(1);
  setTimeout(() => {
    setSteps(2);
  }, 1000);
  let percentage = (steps / 4) * 100;
  /* steps end */

  /* usestate */
  const { residentialStatus, moveInMonth, moveInYear } = prefilledData;
  // console.log(prefilledData);

  const monthYear = `${moveInYear}-${moveInMonth}-01`;
  // console.log(monthYear, new Date(monthYear));
  const [startMonth, setStartMonth] = useState(
    moveInYear ? new Date(monthYear) : null
  );
  const [startYear, setStartYear] = useState(
    moveInYear ? new Date(monthYear) : null
  );

  const monthMoment = moment(startMonth).format('MMMM');
  const yearMoment = moment(startYear).format('yyyy');


  const [disableBtn, setDisableBtn] = useState(false);
  /* usestate end */

  const navigate = useNavigate();

  /* react-form-hook */
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onBlur",
    mode: "all",
  });
  /* react-form-hook end */

  /* fetchify address input */
  const [addressIdValue, setAddressIdValue] = useState([]);
  const [addressList, setAddressList] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressSplit, setAddressSplit] = useState({});

  const fetchifyKey = REACT_APP_FETCHIFYKEY;

  const getAddressId = (value, id) => {
    // console.log(value, id);

    setSelectedAddress(value);
    fullAddress(id);

    /* address list */
    setAddressList(false);
    /* address list end */
  };

  const selectAddressFun = (value) => {
    // console.log(value);
    setSelectedAddress(value);

    setDisableBtn(false);
    if (value === "") {
      setDisableBtn(false);
    }

    let payload = {
      key: fetchifyKey,
      query: value,
      country: 'gbr',
      extra: {
        exclude_pobox: true,
        no_groupings: true,
      },
    };
    // console.log('payload', payload);

    axios
      .post(`https://api.craftyclicks.co.uk/address/1.1/find`, payload)
      .then((response) => {
        const result = response?.data?.results;
        // console.log('response333', response);
        setAddressIdValue(result);

        /* address list */
        setAddressList(true);
        /* address list end */
      })
      .catch((error) => {
        console.log(error);

        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */

        /* address list */
        setAddressList(false);
        /* address list end */
      });
  };

  const fullAddress = (addressId) => {
    let payload = {
      key: fetchifyKey,
      id: addressId,
      country: "gbr",
      // extra: {
      //     "gbr_ceremonial_counties": true
      // }
    };
    // console.log(payload);

    axios
      .post(`https://api.craftyclicks.co.uk/address/1.1/retrieve`, payload)
      .then((response) => {
        const result = response?.data?.result;
        // console.log(result);
        setAddressSplit(result);

        if (
          (result?.building_name !== "" || result?.building_number !== "") &&
          result?.province_name !== ""
        ) {
          // console.log("true");
          setDisableBtn(true);
        } else {
          // console.log("false");
          setDisableBtn(false);

          toast.error("Invalid address, please select another address.", toasterConfig);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* fetchify address input end */

  /* Post data */
  const onSubmitAddress = (data) => {
    let inputData = data;
    // console.log(inputData);

    let payload = {
      action: "submit",
      data: {
        address: selectedAddress,
        postcode: addressSplit?.postal_code,
        houseNo: addressSplit?.building_number,
        houseName: addressSplit?.building_name,
        street:
          addressSplit?.street_prefix +
          addressSplit?.street_name +
          addressSplit?.street_suffix,
        city: addressSplit?.locality,
        region: addressSplit?.province_name,
        moveInMonth: moment(startMonth).format("MM"),
        moveInYear: moment(startYear).format("yyyy"),
        residentialStatus: inputData?.residentialRadio,
        amount: authCtx?.amountSlideValue,
        duration: authCtx?.periodSlideValueMonth,
        fullMonth: moment(startMonth).format("MMMM"),
      },
    };
    // console.log(payload);
    localStorage.setItem("residentialAddress", JSON.stringify(payload?.data));


    // redirect to Address Lookup
    if (startMonth && startYear) {
      // console.log("Redirect");
      navigate("/confirm-address", { replace: true });
    } else {
      // console.log("No Redirection");
      toast.error("Month and Year field is required.", toasterConfig);
    }
  };
  /* Post data end */

  useEffect(() => {
    // localStorage.removeItem('residentialAddress');

    /* form service */
    formService.inputEmptyCheck();
    /* form service end */
  }, [selectedAddress]);




  /* radio data */
  const addressRadioData = {
    residentialRadioData: [
      {
        id: "homeOwner",
        value: "Home owner",
      },
      {
        id: "privateTenant",
        value: "Private tenant",
      },
      {
        id: "livingWithParents",
        value: "Living with parents",
      },
      {
        id: "councilTenant",
        value: "Council tenant",
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

                <form onSubmit={handleSubmit(onSubmitAddress)}>
                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">Select your address</p>
                    {/* address input */}
                    <div className="form-grp-field mb0">
                      <div className="form-grp">
                        <input
                          className="form-field"
                          type="address"
                          id="address"
                          name="address"
                          autoComplete="off"
                          {...register("address", {
                            required: "Address is required",
                          })}
                          onChange={(e) => selectAddressFun(e.target.value)}
                          value={selectedAddress}
                        />
                        <p className="form-label">Select Address</p>
                      </div>
                      {errors.address && (
                        <ErrorMsgComp errorMessage={errors.address.message} />
                      )}
                    </div>
                    {addressList && (
                      <div className="search-list-box">
                        <ul className="search-list comm-scroll">
                          {addressIdValue.map((item) => (
                            <li
                              key={item?.id}
                              data-id={item?.id}
                              onClick={(e) => {
                                getAddressId(
                                  e.target.outerText,
                                  e.target.getAttribute("data-id")
                                );
                              }}
                            >
                              {item?.labels.filter((label) => label).join(", ")}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* address input end */}
                  </div>
                  {/* end */}
                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">When did you move in?</p>
                    <div className="f-row f-2 custm-frow">
                      <div className="f-col">
                        {/* start */}
                        <div className="form-grp-field">
                          <div className="form-grp sTop">
                            <p className="form-label">Month</p>

                            <Controller
                              name={"moveMonth"}
                              control={control}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <DatePicker
                                    className={`form-field ${startMonth ? "field--not-empty" : null}`}
                                    onChange={(e) => {
                                      onChange(e);
                                      setStartMonth(e);
                                    }}
                                    calendarClassName="removeYear"
                                    // selected={startMonth}
                                    selected={value}
                                    value={monthMoment === "Invalid date" ? null : monthMoment}
                                    dateFormat="MMMM"
                                    autoComplete="off"
                                    showMonthYearPicker
                                    showFullMonthYearPicker
                                  // placeholderText="MM"
                                  />
                                );
                              }}
                            />

                            {/* <DatePicker
                              className="form-field"
                              selected={startMonth}
                              dateFormat="MMMM"
                              autoComplete="off"
                              showMonthYearPicker
                              showFullMonthYearPicker
                              onChange={(date) => setStartMonth(date)}
                            // name="month"
                            // {...register2("month", {
                            //     required: "Date is required"
                            // })}
                            /> */}
                          </div>
                          {/* {errors.month &&
                                  <div className="form-input-error">
                                      <i className="icon-input-error"></i>
                                      <p>{errors.month.message}</p>
                                  </div>
                              }*/}
                        </div>
                        {/* end */}
                      </div>
                      <div className="f-col">
                        {/* start */}
                        <div className="form-grp-field">
                          <div className="form-grp sTop">
                            <p className="form-label">Year</p>
                            <Controller
                              name={"moveYear"}
                              control={control}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <DatePicker
                                    className={`form-field ${startYear ? "field--not-empty" : null}`}
                                    onChange={(e) => {
                                      onChange(e);
                                      setStartYear(e);
                                    }}
                                    // selected={startMonth}
                                    selected={value}
                                    value={yearMoment === "Invalid date" ? null : yearMoment}
                                    maxDate={new Date()}
                                    dateFormat="yyyy"
                                    autoComplete="off"
                                    showYearPicker
                                  // placeholderText="MM"
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
                              onChange={(date) => setStartYear(date)}
                            /> */}
                          </div>
                        </div>
                        {/* end */}
                      </div>
                    </div>
                  </div>
                  {/* end */}
                  {/* start */}
                  <div className="form-grp-box">
                    <p className="form-quest">
                      What’s your residential status?
                    </p>
                    <div className="mob-full-chk">

                      {/* start */}
                      {addressRadioData?.residentialRadioData?.map(item => (
                        <RadioButton
                          key={item?.id}
                          id={item?.id}
                          name="residentialRadio"
                          title={item?.value}
                          value={item?.value}
                          defaultChecked={item?.value === residentialStatus}
                          register={register}
                          rules={{ required: true }}
                        />
                      ))}
                      {/* end */}
                    </div>
                    {errors.residentialRadio?.type === "required" && (
                      <ErrorMsgComp errorMessage={"Residential status is required"} />
                    )}
                  </div>
                  {/* end */}
                  {/* [disabled] */}
                  <button
                    type="submit"
                    className="button button--block"
                    disabled={!disableBtn}
                  >
                    Continue
                  </button>
                </form>
                {/* </div> */}
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

export default WelcomeStep2;
