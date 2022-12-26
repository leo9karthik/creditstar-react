import React from "react";

/* plugin */
import { motion } from "framer-motion";
/* plugin end */

const ErrorMsgComp = ({ errorMessage, classes }) => {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`form-input-error ${classes}`}
    >
      <i className="icon-input-error"></i>
      <p>{errorMessage}</p>
    </motion.div>
  );
};

export default ErrorMsgComp;
