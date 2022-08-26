import React, { useState } from 'react';
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,

    passwordChanged: (isChanged) => { },
    login: (token) => { },
    logout: () => { }
});

export default AuthContext



export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('authToken');
    const isPasswordChanged = localStorage.getItem('isPasswordChanged');
    const [token, setToken] = useState(initialToken);
    const [passwordChanged, setPasswordChanged] = useState(isPasswordChanged);

    const userIsLoggedIn = !!token;
    const userPaswordChanged = !!passwordChanged;

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('authToken', token)
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('authToken')
    }

    const passwordChangedHandler = (isChanged) => {
        setPasswordChanged(isChanged)
        if (isChanged) {
            localStorage.setItem('isPasswordChanged', isChanged)
        } else {
            localStorage.removeItem('isPasswordChanged')
        }

    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        userPaswordChanged: userPaswordChanged,
        passwordChanged: passwordChangedHandler,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue} >
        {props.children}
    </AuthContext.Provider>
}
