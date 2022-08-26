import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./service/RequireAuth";

import Login from "./sheets/auth/Login";
import OtpVerification from "./sheets/auth/OtpVerification";

import Welcome from "./sheets/main/steps/Welcome";
import WelcomeStep1 from "./sheets/main/steps/WelcomeStep1";
import WelcomeStep2 from "./sheets/main/steps/WelcomeStep2";
import WelcomeStep2_1 from "./sheets/main/steps/WelcomeStep2_1";
import WelcomeStep3 from "./sheets/main/steps/WelcomeStep3";
import WelcomeStep4 from "./sheets/main/steps/WelcomeStep4";

import AlmostDone from "./sheets/main/AlmostDone";
import CardDetail from "./sheets/main/CardDetail";
import Congratulations from "./sheets/main/Congratulations";
import FinalizeLoanDetail from "./sheets/main/FinalizeLoanDetail";
import PageNotFound from "./sheets/main/PageNotFound";
import YourAllSet from "./sheets/main/YourAllSet";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Auth Pages starts here */}
        <Route path="/" element={<Login />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        {/* Auth Pages ends here */}


        {/* Steps Pages starts here */}
        {/* <Route path="/welcome" element={<RequireAuth><Welcome /></RequireAuth>} /> */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/welcome-step1" element={<WelcomeStep1 />} />
        <Route path="/welcome-step2" element={<WelcomeStep2 />} />
        <Route path="/welcome-step2-1" element={<WelcomeStep2_1 />} />
        <Route path="/welcome-step3" element={<WelcomeStep3 />} />
        <Route path="/welcome-step4" element={<WelcomeStep4 />} />
        {/* Steps Pages ends here */}


        {/* Static Pages starts here */}
        <Route path="/almost-done" element={<AlmostDone />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/card-detail" element={<CardDetail />} />
        <Route path="/finalize-loan-detail" element={<FinalizeLoanDetail />} />
        <Route path="/your-all-set" element={<YourAllSet />} />
        {/* Static Pages ends here */}


        <Route path="*" element={<PageNotFound />} />

      </Routes>

      {/* <ToastContainer /> */}
    </div>

  );
}

export default App;
