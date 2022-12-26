import React, { useEffect } from "react";

const { REACT_APP_PUBLIC_URL, REACT_APP_HOMEURL } = process.env;

const Header = (props) => {
  const { headerOne } = props;


  useEffect(() => {

    if (window.innerWidth > 990) {
      // Header Animation
      const body = document.body;
      const scrollUp = "scroll-up";
      const scrollDown = "scroll-down";
      let lastScroll = 0;
      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        // console.log(currentScroll);
        if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
          // down
          body.classList.remove(scrollUp);
          body.classList.add(scrollDown);
        } else if (
          currentScroll < lastScroll &&
          body.classList.contains(scrollDown)
        ) {
          // up
          body.classList.remove(scrollDown);
          body.classList.add(scrollUp);
        } else if (
          currentScroll === 0
        ) {
          body.classList.remove(scrollUp);
        }
        lastScroll = currentScroll;
      });
      // Header Animation Ends
    }


  }, []);

  return (
    <header id="header" className={headerOne ? "header1" : "header2"}>
      <div className="header-box">
        <div className="head-container">
          <div className="head-left">
            <div className="logoBox">
              <a className="logo" href={REACT_APP_HOMEURL}>
                <picture>
                  <source
                    media="(max-width:990px)"
                    srcSet={`${REACT_APP_PUBLIC_URL}/img/logo-white.svg`}
                  />
                  <img
                    className="header-logo2"
                    src={`${REACT_APP_PUBLIC_URL}/img/logo.svg`}
                    alt="logo"
                  />
                  <img
                    className="header-logo1"
                    src={`${REACT_APP_PUBLIC_URL}/img/logo-white.svg`}
                    alt="logo"
                  />
                  <img
                    className="scroll-logo"
                    src={`${REACT_APP_PUBLIC_URL}/img/logo.svg`}
                    alt="logo"
                  />
                </picture>
              </a>
            </div>
          </div>
          <div className="head-right">
            <div className="menuBtn">
              {/* <button className="button butn-blue">My account</button> */}
              {/* <button className="button butn-blue" onClick={logoutFn}>Logout</button> */}
              {/* <div className="menu side-menu"><img src={`${REACT_APP_PUBLIC_URL}/img/menu-white.svg`} alt="Menu" /></div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
