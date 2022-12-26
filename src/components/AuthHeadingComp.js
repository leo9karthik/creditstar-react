import React from 'react'

/* plugin */
import { motion } from "framer-motion";
/* plugin end */


const AuthHeadingComp = () => {
    return (
        <div className="banner-box">
            <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="banner-hdn"
            >
                Your online application will take a few minutes to complete!
            </motion.h2>
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="banner-para"
            >
                <p>
                    Applying for a Creditstar loan is fast, secure, and reliable.
                </p>
            </motion.div>
        </div>
    )
}

export default AuthHeadingComp