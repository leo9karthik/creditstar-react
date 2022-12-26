export const stepFun = (instanceId) => {
  return {
    OtpPhoneNumber: `/${instanceId}`,
    OtpPhoneCode: "/verify-phone",
    Purpose: "/welcome",
    BasicInfo: "/personal-information",
    Authentication: "/login",
    Address: "/address",
    Finances: "/questionnaire",
    Bank: "/bank-details",
    Decision: "/almost-done",
    RepaymentSchedule: "/approved",
    Card: "/verify-card",
    Documents: "/sign-contract",
    Password: "/setup-password",
    End: "/success",
    Failure: "/failure",
  };
};

export const toasterConfig = {
  position: "top-right",
  // autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
