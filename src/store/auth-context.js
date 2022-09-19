import React, { useState } from 'react';
const AuthContext = React.createContext({
    instanceId: '',
    currentStep: '',
    createInstanceFunc: () => { },
    currentStepFunc: () => { }

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
        currentStepFunc: currentStepHandler

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
