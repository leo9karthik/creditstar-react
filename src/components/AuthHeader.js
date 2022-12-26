import React, { useEffect } from 'react'

const { REACT_APP_PUBLIC_URL, REACT_APP_HOMEURL, REACT_APP_LOGINURL } = process.env;

const AuthHeader = () => {

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

    }, [])

    return (
        <header id="header">
            <div className="header-box">
                <div className="head-container">
                    <div className="head-left">
                        <div className="logoBox">
                            <a className="logo" href={REACT_APP_HOMEURL}>
                                <picture>
                                    <source media="(max-width:990px)" srcSet={`${REACT_APP_PUBLIC_URL}/img/logo.svg`} />
                                    <img src={`${REACT_APP_PUBLIC_URL}/img/logo-white.svg`} alt="logo" />
                                    <img className="scroll-logo" src={`${REACT_APP_PUBLIC_URL}/img/logo.svg`} alt="logo" />
                                </picture>
                            </a>
                        </div>
                    </div>
                    <div className="head-right">
                        {/* <ul className="header-list">
                            <li><a href="#!">Already have an account?</a></li>
                        </ul> */}
                        <div className="menuBtn">
                            <a href={REACT_APP_LOGINURL} className="button butn-blue">Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AuthHeader