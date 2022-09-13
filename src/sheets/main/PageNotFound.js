import React from 'react'
import Header from '../../components/Header';

const { REACT_APP_PUBLIC_URL } = process.env;

const PageNotFound = () => {
  return (

    <div>

      {/* Header Starts */}
      <Header headerOne={true} />
      {/* Header Ends */}


      {/* Main Container Starts */}
      <div className="main-container">
        <div className="banner-top-img inner-bg-img add-bg-mob" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.jpg')` }}>
        </div>
        <div className="container">
          {/* start */}
          <div className="comm-box pnf-box">

            <div className="pnf-img">
              <img src={`${REACT_APP_PUBLIC_URL}/img/linkoff.svg`} alt="" />
            </div>

            <div className="congo-cont">
              <h4 className="congo-hdn">Oops!</h4>
              <div className="congo-para">
                <p>The page your’re looking for <br /> could not be found</p>
              </div>
            </div>


          </div>
          {/* end */}
        </div>
      </div>
      {/* Main Container Ends */}
    </div>
  )
}

export default PageNotFound