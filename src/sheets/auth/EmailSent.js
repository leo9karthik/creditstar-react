import React from "react";

/* plugin */
import { motion } from "framer-motion";
/* plugin end */

/* component */
import AuthHeader from "../../components/AuthHeader";
import InnerBgComp from "../../components/InnerBgComp";
import AuthHeadingComp from "../../components/AuthHeadingComp";
/* component end */


const EmailSent = () => {

    return (
        <div>
            {/* Header Starts */}
            <AuthHeader />
            {/* Header Ends */}

            {/* Main Container Starts */}
            <div className="main-container">
                <InnerBgComp bgImg={true} />

                {/* start */}
                <div className="comm-rev">
                    <div className="container">

                        {/* heading component */}
                        <AuthHeadingComp />
                        {/* heading component end */}

                        {/* form */}
                        <motion.div
                            initial={{ y: 60, scale: 0.8, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="form-box"
                        >
                            <div className="auth-hdn-box mb0">
                                <h2 className="auth-hdn">The link has been sent.</h2>
                                <div className="auth-para">
                                    <p>
                                        To reset your password, click the link in the email we’ve sent you.
                                    </p>
                                </div>
                            </div>


                            <div className="auth-para contact-mt">
                                <p> Didn’t get an email? <a href="!#" className="comm-link"> Contact us </a></p>
                            </div>

                        </motion.div>
                        {/* form end */}
                    </div>
                </div>
                {/* end */}
            </div>
            {/* Main Container Ends */}
        </div>
    );
};

export default EmailSent;
