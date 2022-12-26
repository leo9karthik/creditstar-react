import React, { useState } from 'react';

const AuthContext = React.createContext({
    instanceId: '',
    currentStep: '',
    prefilledData: {},
    createInstanceFunc: () => { },
    prefilledDataFunc: () => { },


    amountSlideValue: null,
    periodSlideValue: null,
    periodSlideValueMonth: null,

    numMonthlyPayment: null,
    totalInterest: null,
    totalAmountWithInt: null,

    paymentData: null,
    productUrl: null,

    offerData: null,

    createAmountValueFunc: () => { },
    createPeriodValueFunc: () => { },
    paymentDataFunc: () => { },
    productUrlFunc: () => { },

    offerDataFunc: () => { },

    logoutFunc: () => { }

});

export default AuthContext



export const AuthContextProvider = (props) => {
    const initialInstances = localStorage.getItem('instancesId');
    const intialPrefilledData = JSON.parse(localStorage.getItem('prefilledData'));

    const [instanceId, setInstanceId] = useState(initialInstances);
    const [prefilledData, setPrefilledData] = useState(intialPrefilledData);

    const instanceIdHandler = (id) => {
        setInstanceId(id);
        // console.log("context CTX :", id);
        localStorage.setItem('instancesId', id)
    }

    const prefilledDataHandler = (value) => {
        setPrefilledData(value);
        // console.log("context CTX :", value);
        localStorage.setItem('prefilledData', JSON.stringify(value));
    }


    /* monthly calculation */
    const initialAmount = parseFloat(localStorage.getItem('amount')) || 1000;
    const intialPeriod = parseFloat(localStorage.getItem('period')) || 8;
    const intialPeriodMonth = parseFloat(localStorage.getItem('periodMonth')) || 180;

    const [amountValue, setAmountValue] = useState(initialAmount);
    const [periodValue, setPeriodValue] = useState(intialPeriod);
    const [periodValueInMonth, setPeriodValueInMonth] = useState(intialPeriodMonth);


    const intialPaymentData = JSON.parse(localStorage.getItem('paymentData')) || {};
    const [paymentData, setPaymentData] = useState(intialPaymentData);


    const [productUrlCtx, setProductUrlCtx] = useState(null);


    const intialOfferData = JSON.parse(localStorage.getItem('offerData')) || {};
    const [offerDataValue, setOfferDataValue] = useState(intialOfferData);

    const amountSlideValueHandler = (value) => {
        // console.log(value);

        setAmountValue(value);
        localStorage.setItem('amount', value);
    }

    const periodSlideValueHandler = (value) => {
        // console.log(value);
        let periodMonth = value * 30;

        setPeriodValueInMonth(periodMonth);
        setPeriodValue(value);
        localStorage.setItem('period', value);
        localStorage.setItem('periodMonth', periodMonth);
    }

    const paymentDataHandler = (value) => {
        // console.log(value);
        localStorage.setItem('paymentData', JSON.stringify(value));
        setPaymentData(value);
    }

    const productUrlHandler = (value) => {
        // console.log(value);
        setProductUrlCtx(value);
    }

    const OfferDataHandler = (value) => {
        // console.log(value);
        localStorage.setItem('offerData', JSON.stringify(value));
        setOfferDataValue(value);
    }
    /* monthly calculation end */




    /* logout */
    const logoutHandler = async () => {
        localStorage.clear();
    };
    /* logout end */



    const contextValue = {
        instanceId: instanceId,
        prefilledData: prefilledData,

        createInstanceFunc: instanceIdHandler,
        prefilledDataFunc: prefilledDataHandler,




        amountSlideValue: amountValue,
        periodSlideValue: periodValue,
        periodSlideValueMonth: periodValueInMonth,

        numMonthlyPayment: paymentData.numMonthlyPayment,
        totalInterest: paymentData.totalInterest,
        totalAmountWithInt: paymentData.totalAmountWithInt,
        paymentData: paymentData,
        productUrl: productUrlCtx,

        offerData: offerDataValue,


        createAmountValueFunc: amountSlideValueHandler,
        createPeriodValueFunc: periodSlideValueHandler,
        paymentDataFunc: paymentDataHandler,
        productUrlFunc: productUrlHandler,

        offerDataFunc: OfferDataHandler,

        logoutFunc: logoutHandler,

    }
    return <AuthContext.Provider value={contextValue} >
        {props.children}
    </AuthContext.Provider>
}
