import { Routes, Route } from "react-router-dom";
import RequireAuth from "./service/RequireAuth";

import Login from "./sheets/auth/Login";
import OtpVerification from "./sheets/auth/OtpVerification";

import Welcome from "./sheets/main/steps/Welcome";
import WelcomeStep1 from "./sheets/main/steps/WelcomeStep1";
import WelcomeStep2 from "./sheets/main/steps/WelcomeStep2";
import WelcomeStep2In1 from "./sheets/main/steps/WelcomeStep2In1";
import WelcomeStep3 from "./sheets/main/steps/WelcomeStep3";
import WelcomeStep4 from "./sheets/main/steps/WelcomeStep4";

import AlmostDone from "./sheets/main/AlmostDone";
import CardDetail from "./sheets/main/CardDetail";
import Congratulations from "./sheets/main/Congratulations";
import FinalizeLoanDetail from "./sheets/main/FinalizeLoanDetail";
import PageNotFound from "./sheets/main/PageNotFound";
import YourAllSet from "./sheets/main/YourAllSet";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./sheets/main/HomePage";


function App() {

  return (
    <div className="App">
      <Routes>
        {/* Auth Pages starts here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        {/* Auth Pages ends here */}


        {/* Info Pages starts here */}
        <Route path="/welcome" element={<RequireAuth><Welcome /></RequireAuth>} />
        <Route path="/basic-info" element={<RequireAuth><WelcomeStep1 /></RequireAuth>} />
        <Route path="/address-lookup" element={<RequireAuth><WelcomeStep2 /></RequireAuth>} />
        <Route path="/current-address" element={<RequireAuth><WelcomeStep2In1 /></RequireAuth>} />
        <Route path="/finances" element={<RequireAuth><WelcomeStep3 /></RequireAuth>} />
        <Route path="/bank-details" element={<RequireAuth><WelcomeStep4 /></RequireAuth>} />
        {/* Info Pages ends here */}


        {/* Static Pages starts here */}
        <Route path="/almost-done" element={<RequireAuth><AlmostDone /></RequireAuth>} />
        <Route path="/congratulations" element={<RequireAuth><Congratulations /></RequireAuth>} />
        <Route path="/card-detail" element={<RequireAuth><CardDetail /></RequireAuth>} />
        <Route path="/finalize-loan-detail" element={<RequireAuth><FinalizeLoanDetail /></RequireAuth>} />
        <Route path="/your-all-set" element={<RequireAuth><YourAllSet /></RequireAuth>} />
        {/* Static Pages ends here */}


        <Route path="*" element={<PageNotFound />} />

      </Routes>

      <ToastContainer />
    </div>

  );
}

export default App;
