import React from 'react'

/* plugin */
import { motion } from "framer-motion";
/* plugin end */

/* component */
import Header from '../../components/Header';
import InnerBgComp from '../../components/InnerBgComp';
import { Link } from 'react-router-dom';
/* component end */

const { REACT_APP_PUBLIC_URL } = process.env;

const PageNotFound = () => {
  return (

    <div>

      {/* Header Starts */}
      <Header headerOne={true} />
      {/* Header Ends */}


      {/* Main Container Starts */}
      <div className="main-container">
        <InnerBgComp classes={"inner-bg-img add-bg-mob"} />
        <div className="container">
          {/* start */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="comm-box pnf-box">

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pnf-img">
              <img src={`${REACT_APP_PUBLIC_URL}/img/linkoff.svg`} alt="" />
            </motion.div>

            <div className="congo-cont">
              <motion.h4
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="congo-hdn">
                Oops!
              </motion.h4>
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="congo-para">
                <p>The page your’re looking for <br /> could not be found</p>
              </motion.div>

              <Link to="/login">Test</Link>
            </div>


          </motion.div>
          {/* end */}
        </div>
      </div >
      {/* Main Container Ends */}
    </div >
  )
}

export default PageNotFound