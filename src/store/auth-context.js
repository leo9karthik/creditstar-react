import React, { useState } from 'react';
import { useEffect } from 'react';
const AuthContext = React.createContext({
    instanceId: '',
    currentStep: '',
    createInstanceFunc: () => { },
    currentStepFunc: () => { },



    amountSlideValue: null,
    periodSlideValue: null,

    numMonthlyPayment: null,
    totalInterest: null,
    totalAmountWithInt: null,

    createAmountValueFunc: () => { },
    createPeriodValueFunc: () => { },

    // token: '',
    // isLoggedIn: false,
    // passwordChanged: (isChanged) => { },
    // login: (token) => { },
    // logout: () => { }
});

export default AuthContext



export const AuthContextProvider = (props) => {
    const initialInstances = localStorage.getItem('instances-id');
    const intialCurrentStep = localStorage.getItem('current-step');

    const [instanceId, setInstanceId] = useState(initialInstances);
    const [currentStep, setCurrentStep] = useState(intialCurrentStep);

    const instanceIdHandler = (id) => {
        setInstanceId(id);
        // console.log("context CTX :", id);
        localStorage.setItem('instances-id', id)
    }

    const currentStepHandler = (step) => {
        setCurrentStep(step);
        // console.log("context CTX :", id);
        localStorage.setItem('current-step', step)
    }





    /* monthly calculation */
    const initialAmount = localStorage.getItem('amount') || 1000;
    const intialPeriod = localStorage.getItem('period') || 8;
    const [amountValue, setAmountValue] = useState(initialAmount);
    const [periodValue, setPeriodValue] = useState(intialPeriod);
    const [paymentData, setPaymentData] = useState({});


    const amountSlideValueHandler = (value) => {
        console.log(value);

        setAmountValue(value);
        localStorage.setItem('amount', value);
    }

    const periodSlideValueHandler = (value) => {
        console.log(value);

        setPeriodValue(value);
        localStorage.setItem('period', value);
    }


    // useEffect(() => {
    //     const initialAmount = localStorage.getItem('amount');
    //     const intialPeriod = localStorage.getItem('period');

    //     console.log("initialamount : ", initialAmount)
    //     console.log("initialperiod : ", intialPeriod)

    //     setAmountValue(parseFloat(initialAmount) || 500)
    //     setPeriodValue(parseFloat(intialPeriod) || 6)
    // }, [])



    useEffect(() => {
        let totalInterest, calculateIntersetAmount, totalAmountWithInt, monthlyPayment, numMonthlyPayment;

        totalInterest = periodValue * 6;
        // console.log("totalinterest : ", totalInterest)
        calculateIntersetAmount = amountValue * (totalInterest / 100);
        console.log("calculate 2 : ", calculateIntersetAmount);


        totalAmountWithInt = parseFloat(amountValue) + parseFloat(calculateIntersetAmount);
        // console.log("totalAmountWithInt:", totalAmountWithInt);
        console.log("periodValue:", periodValue);


        monthlyPayment = parseFloat(totalAmountWithInt) / parseFloat(periodValue);
        // console.log('monthlypayment : ', monthlyPayment)
        numMonthlyPayment = +monthlyPayment;

        let data = { numMonthlyPayment, totalInterest, totalAmountWithInt };
        console.log('data', data);
        setPaymentData(data);

        // console.log("context paymentData :", periodValue, numMonthlyPayment, totalInterest, totalAmountWithInt);

        // localStorage.setItem('monthlyPayment', numMonthlyPayment);
        // localStorage.setItem('totalInterest', totalInterest);
        // localStorage.setItem('totalAmountWithInt', totalAmountWithInt);

    }, [amountValue, periodValue])
    /* monthly calculation end */




    // const initialToken = localStorage.getItem('authToken');
    // const isPasswordChanged = localStorage.getItem('isPasswordChanged');
    // const [token, setToken] = useState(initialToken);
    // const [passwordChanged, setPasswordChanged] = useState(isPasswordChanged);

    // const userIsLoggedIn = !!token;
    // const userPaswordChanged = !!passwordChanged;

    // const loginHandler = (token) => {
    //     setToken(token)
    //     localStorage.setItem('authToken', token)
    // }

    // const logoutHandler = () => {
    //     setToken(null);
    //     localStorage.removeItem('authToken')
    // }

    // const passwordChangedHandler = (isChanged) => {
    //     setPasswordChanged(isChanged)
    //     if (isChanged) {
    //         localStorage.setItem('isPasswordChanged', isChanged)
    //     } else {
    //         localStorage.removeItem('isPasswordChanged')
    //     }
    // }

    const contextValue = {
        instanceId: instanceId,
        currentStep: currentStep,
        createInstanceFunc: instanceIdHandler,
        currentStepFunc: currentStepHandler,




        amountSlideValue: amountValue,
        periodSlideValue: periodValue,

        numMonthlyPayment: paymentData.numMonthlyPayment,
        totalInterest: paymentData.totalInterest,
        totalAmountWithInt: paymentData.totalAmountWithInt,


        createAmountValueFunc: amountSlideValueHandler,
        createPeriodValueFunc: periodSlideValueHandler,



        // token: token,
        // isLoggedIn: userIsLoggedIn,
        // userPaswordChanged: userPaswordChanged,
        // passwordChanged: passwordChangedHandler,
        // login: loginHandler,
        // logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue} >
        {props.children}
    </AuthContext.Provider>
}
