import React from 'react'

const { REACT_APP_PUBLIC_URL } = process.env;

const Header = (props) => {
    const { headerOne } = props;
    // console.log(headerOne);

    return (
        <header id="header" className={headerOne ? 'header1' : 'header2'}>
            <div className="header-box">
                <div className="head-container">
                    <div className="head-left">
                        <div className="logoBox">
                            <a className="logo" href="#">
                                <picture>
                                    <source media="(max-width:990px)" srcSet={`${REACT_APP_PUBLIC_URL}/img/logo-white.svg`} />
                                    <img className="header-logo2" src={`${REACT_APP_PUBLIC_URL}/img/logo.svg`} alt="logo" />
                                    <img className="header-logo1" src={`${REACT_APP_PUBLIC_URL}/img/logo-white.svg`} alt="logo" />
                                    <img className="scroll-logo" src={`${REACT_APP_PUBLIC_URL}/img/logo.svg`} alt="logo" />
                                </picture>
                            </a>
                        </div>
                    </div>
                    <div className="head-right">
                        <div className="menuBtn">
                            <a href="#" className="button butn-blue">My account</a>
                            <div className="menu side-menu"><img src={`${REACT_APP_PUBLIC_URL}/img/menu-white.svg`} alt="Menu" /></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Side Menu */}
            {/* <div className="menuOverlay" />
            <div className="mobile-menu">
                <h3 className="close-menu">
                    <img src="" alt="cancel" />
                </h3>
                <ul className="header-list">
                    <li><a href="#">Already have an account?</a></li>
                </ul>
                <div className="mob-menu-footer">
                    <div className="footerIcon-section">
                        <img src alt="Company Head Office Contact Number" />
                    </div>
                    <a href="#" className="mob-menu-footer--num" />
                </div>
            </div> */}
            {/* Side Menu End */}
        </header>
    )
}

export default Header