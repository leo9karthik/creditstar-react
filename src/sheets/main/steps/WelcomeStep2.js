import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from "react-hook-form";
import formService from '../../../service/formService';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import axios from 'axios';
import { toast } from 'react-toastify';
import MontlyPaymentComp from '../../../components/MontlyPaymentComp';
import gs from '../../../service/global';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const WelcomeStep2 = () => {
    const authCtx = useContext(AuthContext);
    var instanceId = authCtx?.instanceId;
    // console.log(instanceId);


    /* steps */
    const [steps, setSteps] = useState(1);
    setTimeout(() => {
        setSteps(2)
    }, 1000);
    let percentage = (steps / 4) * 100;
    /* steps end */

    /* usestate */
    const [residentialRadio, setResidentialRadio] = useState('Home Owner');

    const [startMonth, setStartMonth] = useState(new Date());
    const [startYear, setStartYear] = useState(new Date());
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

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });
    /* react-form-hook end */

    /* fetchify address input */
    const [addressIdValue, setAddressIdValue] = useState([]);
    const [addressList, setAddressList] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    const getAddressId = (value, id) => {
        console.log(value, id);

        setSelectedAddress(value);
        fullAddress(id);

        /* address list */
        setAddressList(false);
        /* address list end */
    }

    const selectAddressFun = (value) => {
        console.log(value);
        setSelectedAddress(value);

        let payload = {
            key: "c9b13-fd9fb-cf970-0839a",
            query: value,
            country: "gbr",
        }
        console.log(payload);


        axios.post(`https://api.craftyclicks.co.uk/address/1.1/find`, payload)
            .then((response) => {
                const result = response?.data?.results;
                console.log(result);
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
    }


    const fullAddress = (addressId) => {

        let payload = {
            key: "c9b13-fd9fb-cf970-0839a",
            id: addressId,
            country: "gbr",
        }
        console.log(payload);

        axios.post(`https://api.craftyclicks.co.uk/address/1.1/retrieve`, payload)
            .then((response) => {
                const result = response;
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /* fetchify address input end */


    /* Post data */
    const onSubmitAddress = (data) => {
        // let inputData = data;
        // console.log(inputData);

        let payload = {
            "action": "submit",
            "data": {
                "address": selectedAddress,
                "residentialStatus": residentialRadio,
                "moveInMonth": moment(startMonth).format('MM'),
                "moveInYear": moment(startYear).format('yyyy'),
                "amount": authCtx?.amountSlideValue + "",
                "duration": authCtx?.periodSlideValue + "",

                // city: city,
                // region: region,
                // street: street_prefix + street_name + street_suffix,
                // houseNo: building_number,
                // postcode: postal_code,
            }
        }
        console.log(payload);
        localStorage.setItem('residentialAddress', JSON.stringify(payload?.data));

        /* Loader Starts */
        // gs.showLoader(true);
        /* Loader Ends */

        // axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
        //     .then((response) => {
        //         const result = response?.data;
        //         authCtx.currentStepFunc(result?.currentStepId);
        //         console.log(result);


        //         /* Loader Starts */
        //         gs.showLoader(false);
        //         /* Loader Ends */

        //         // redirect to Address Lookup 
        //         navigate("/current-address", { replace: true });
        //     })
        //     .catch((error) => {
        //         console.log(error);

        // /* Loader Starts */
        // gs.showLoader(false);
        // /* Loader Ends */

        //         toast.error('Something went wrong!', {
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });

        //     });

        // redirect to Address Lookup 
        navigate("/current-address", { replace: true });
    }
    /* Post data end */


    /* get radio data */
    const residentialRadioFun = (value) => {
        console.log(value);
        setResidentialRadio(value);
    }
    /* get radio data end */


    useEffect(() => {
        // localStorage.removeItem('residentialAddress');

        /* form service */
        formService.inputEmptyCheck();
        /* form service end */
    }, [selectedAddress])

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
                                            Your residency
                                        </h3>
                                        <div className="comm-para">
                                            <p>You can find your address by adding your postal code.</p>
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

                                {/* <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={`form-grp-box ${!showAddress ? 'mb0' : ''}`}>
                                        <h6 className="form-quest">What’s your current address?</h6>
                                        <div className="input-n-btn">
                                            <div className="post-input">
                                                <div className="form-grp">
                                                    <input
                                                        className="form-field"
                                                        type="text"
                                                        id="postcode"
                                                        name="postcode"
                                                        {...register("postcode", {
                                                            required: "UK postcode is required",
                                                        })}
                                                    />
                                                    <p className="form-label">UK postcode</p>
                                                </div>
                                                {errors.postcode &&
                                                    <div className="form-input-error">
                                                        <i className="icon-input-error"></i>
                                                        <p>{errors.postcode.message}</p>
                                                    </div>
                                                }
                                            </div>
                                            <button className="button butn-blue" >Lookup address</button>
                                        </div>
                                    </div>
                                </form> */}

                                {/* <div className={!showAddress ? 'dnone' : ''}> */}
                                <form onSubmit={handleSubmit2(onSubmitAddress)}>
                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">Select your address</p>
                                        <div className="form-grp-field mb0">
                                            <div className="form-grp">
                                                <input
                                                    className="form-field"
                                                    type="address"
                                                    id="address"
                                                    name="address"
                                                    autoComplete='off'
                                                    {...register2("address", {
                                                        required: "Address is required",
                                                    })}
                                                    onChange={(e) => selectAddressFun(e.target.value)}
                                                    value={selectedAddress}
                                                />
                                                <p className="form-label">Select Address</p>
                                            </div>
                                            {errors2.address &&
                                                <div className="form-input-error">
                                                    <i className="icon-input-error"></i>
                                                    <p>{errors2.address.message}</p>
                                                </div>
                                            }
                                        </div>
                                        {addressList &&
                                            <div className="search-list-box">
                                                <ul className="search-list comm-scroll">
                                                    {
                                                        addressIdValue.map(item => (
                                                            <li
                                                                key={item?.id}
                                                                data-id={item?.id}
                                                                onClick={(e) => { getAddressId(e.target.outerText, e.target.getAttribute('data-id')) }}
                                                            >
                                                                {item?.labels.filter(label => (
                                                                    label
                                                                )).join(", ")}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        }
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
                                                        <DatePicker
                                                            className="form-field"
                                                            selected={startMonth}
                                                            dateFormat="MMMM"
                                                            autoComplete='off'
                                                            showMonthYearPicker
                                                            showFullMonthYearPicker
                                                            onChange={(date) => setStartMonth(date)}
                                                        // name="month"
                                                        // {...register2("month", {
                                                        //     required: "Date is required"
                                                        // })}
                                                        />
                                                    </div>
                                                    {/* {errors2.month &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors2.month.message}</p>
                                                        </div>
                                                    }*/}
                                                </div>
                                                {/* end */}
                                            </div>
                                            <div className="f-col">
                                                {/* start */}
                                                <div className="form-grp-field">
                                                    <div className="form-grp sTop">
                                                        <p className="form-label">YYYY</p>
                                                        <DatePicker
                                                            className="form-field"
                                                            selected={startYear}
                                                            dateFormat="yyyy"
                                                            autoComplete='off'
                                                            showYearPicker
                                                            onChange={(date) => setStartYear(date)}
                                                        // name="yybirth"
                                                        // {...register("yybirth", {
                                                        //     required: "Year is required"
                                                        // })}
                                                        />
                                                    </div>
                                                    {/* {errors.yybirth &&
                                                        <div className="form-input-error">
                                                            <i className="icon-input-error"></i>
                                                            <p>{errors.yybirth.message}</p>
                                                        </div>
                                                    } */}
                                                </div>
                                                {/* end */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* end */}
                                    {/* start */}
                                    <div className="form-grp-box">
                                        <p className="form-quest">What’s your residential status?</p>
                                        <div className="mob-full-chk">
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="homeOwner"
                                                    value="Home Owner"
                                                    defaultChecked={residentialRadio === 'Home Owner'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="homeOwner">
                                                    <span> Home owner </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="privateTenant"
                                                    value="Private Tenant"
                                                    defaultChecked={residentialRadio === 'Private Tenant'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="privateTenant">
                                                    <span> Private tenant </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="livingWithParent"
                                                    value="Living With Parent"
                                                    defaultChecked={residentialRadio === 'Living With Parent'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="livingWithParent">
                                                    <span> Living with parents </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                            {/* start */}
                                            <div className="checkbox-box check-three">
                                                <input
                                                    type="radio"
                                                    name="residstatus"
                                                    id="councilTenant"
                                                    value="Council Tenant"
                                                    defaultChecked={residentialRadio === 'Council Tenant'}
                                                    onClick={(e) => residentialRadioFun(e.target.value)}
                                                />
                                                <label className="chk-label" htmlFor="councilTenant">
                                                    <span> Council tenant </span>
                                                </label>
                                            </div>
                                            {/* end */}
                                        </div>
                                    </div>
                                    {/* end */}
                                    {/* [disabled] */}
                                    <button className="button button--block">Continue</button>
                                </form>
                                {/* </div> */}

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

export default WelcomeStep2
