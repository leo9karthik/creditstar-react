import React, { memo, useContext, useEffect, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContext from "../store/auth-context";
import axios from "axios";
import gs from "../service/global";

import Login from "../sheets/auth/Login";
import OtpVerification from "../sheets/auth/OtpVerification";

// import SignInNotActiveLoan from "../sheets/auth/SignInNotActiveLoan";
// import SignInActiveLoan from "../sheets/auth/SignInActiveLoan";
// import ForgotPassword from "../sheets/auth/ForgotPassword";
// import CreatePassword from "../sheets/auth/CreatePassword";
// import EmailSent from "../sheets/auth/EmailSent";

import Welcome from "../sheets/main/steps/Welcome";
import WelcomeStep1 from "../sheets/main/steps/WelcomeStep1";
import WelcomeStep2 from "../sheets/main/steps/WelcomeStep2";
import WelcomeStep2In1 from "../sheets/main/steps/WelcomeStep2In1";
import WelcomeStep3 from "../sheets/main/steps/WelcomeStep3";
import WelcomeStep4 from "../sheets/main/steps/WelcomeStep4";

import AlmostDone from "../sheets/main/AlmostDone";
import CardDetail from "../sheets/main/CardDetail";
import Congratulations from "../sheets/main/Congratulations";
import FinalizeLoanDetail from "../sheets/main/FinalizeLoanDetail";
import YourAllSet from "../sheets/main/YourAllSet";

import Authentication from "../sheets/main/Authentication";
import Password from "../sheets/main/Password";

import Failure from '../sheets/main/Failure';
import PageNotFound from "../sheets/main/PageNotFound";


const RouteStack = memo(() => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    /* offer API */
    axios
      .get("/offer")
      .then((response) => {
        const result = response?.data;
        // console.log(result);
        authCtx.offerDataFunc(result);

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
    /* offer API end */
  }, []);

  return (
    <>
      <Suspense fallback={<span>Loading...</span>}>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/:instanceParamsId" element={<Login />} />
          <Route path="/verify-phone" element={<OtpVerification />} />

          {/* <Route path="/signin-email-noactive-loan" element={<SignInNotActiveLoan />} />
          <Route path="/signin-email-active-loan" element={<SignInActiveLoan />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-a-password" element={<CreatePassword />} />
          <Route path="/email-sent" element={<EmailSent />} /> */}
          {/* Auth Pages ends here */}

          {/* Info Pages starts here */}
          <Route index path="/welcome" element={<Welcome />} />

          <Route path="/login" element={<Authentication />} />
          <Route path="/setup-password" element={<Password />} />

          <Route path="/personal-information" element={<WelcomeStep1 />} />
          <Route path="/address" element={<WelcomeStep2 />} />
          <Route path="/confirm-address" element={<WelcomeStep2In1 />} />
          <Route path="/questionnaire" element={<WelcomeStep3 />} />
          <Route path="/bank-details" element={<WelcomeStep4 />} />
          {/* Info Pages ends here */}

          {/* Static Pages starts here */}
          <Route path="/almost-done" element={<AlmostDone />} />
          <Route path="/approved" element={<Congratulations />} />
          <Route path="/verify-card" element={<CardDetail />} />
          <Route path="/sign-contract" element={<FinalizeLoanDetail />} />
          <Route path="/success" element={<YourAllSet />} />
          <Route path="/failure" element={<Failure />} />
          {/* Static Pages ends here */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>

      <ToastContainer className="comm-toaster" />
    </>
  );
});

export default RouteStack;
