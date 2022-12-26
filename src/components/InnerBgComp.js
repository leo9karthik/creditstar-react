import React from 'react'

const { REACT_APP_PUBLIC_URL } = process.env;

const InnerBgComp = (props) => {
    const { classes, bgImg } = props;

    return (
        <div className={`banner-top-img ${(bgImg || classes) ? classes : 'removeGrad'}`}
            style={bgImg ? {
                backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/home-banner-img.png')`,
            } : null}
        >
        </div >
    )
}

export default InnerBgComp