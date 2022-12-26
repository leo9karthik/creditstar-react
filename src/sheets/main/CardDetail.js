import React, { useContext, useEffect, useState } from 'react';

/* plugin */
import axios from 'axios';
import { motion } from "framer-motion";
import Modal from 'react-bootstrap/Modal';
import { Base64 } from 'js-base64';
/* plugin end */

/* service */
import formService from '../../service/formService';
import AuthContext from '../../store/auth-context';
import gs from '../../service/global';
import useScript from '../../service/useScript';
/* service end */

/* component */
import ApprovedLoadComp from '../../components/ApprovedLoadComp';
import Header from '../../components/Header'
import InnerBgComp from '../../components/InnerBgComp';
import PopupContentComp from '../../components/PopupContentComp';
/* component end */

const { REACT_APP_DEVELOPMENTURL, REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const CardDetail = () => {
    useScript('https://webservices.securetrading.net/js/v2/st.js');

    const authCtx = useContext(AuthContext);
    const instanceId = authCtx?.instanceId;

    localStorage.setItem("stUrl", REACT_APP_DEVELOPMENTURL);
    localStorage.setItem("flowId", REACT_APP_FLOWID);


    /* Term doc */
    const termDocData = JSON.parse(localStorage.getItem('termDocument'));
    /* console.log(termDocData); */
    const [termModal, setTermModal] = useState(false);
    const [privacyModal, setPrivacyModal] = useState(false);

    let termDocument = termDocData?.terms_and_conditions && Base64.decode(termDocData?.terms_and_conditions);
    let privacyDocument = termDocData?.privacy_policy && Base64.decode(termDocData?.privacy_policy);
    /* Term doc end */

    useEffect(() => {

        /* fetch JWT token */
        let payload = {
            "action": "fetch",
            "data": {}
        }

        // console.log(payload);
        axios.post(`/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data?.responseData?.token;
                // console.log(result);
                // setJwtToken(result);
                localStorage.removeItem('jwtStToken');

                setTimeout(() => {

                    var script_tag = document.createElement('script');
                    script_tag.type = 'text/javascript';
                    script_tag.text = `(function () {

                    // const cardNumberInput = document.getElementById("st-card-number");
                    // cardNumberInput.addEventListener('onChange', (event) => {
                    //     console.log(event.target.value);
                    // })

                    const termError = document.getElementById("term-error");
                    const checkbox = document.getElementById('term-checkbox');
                    checkbox.addEventListener('change', (event) => {
                        if (event.currentTarget.checked) {
                            // console.log('checked');
                            termError.classList.add("dnone");
                        } else {
                            // console.log('not checked');
                            termError.classList.remove("dnone");
                        }
                    })

                    var st = SecureTrading({
                        jwt: '${result}',
                        deferInit: true,
                        styles: {
                            'background-color-input': '#fff',
                            'color-input': '#000',
                            'border-radius-input': '8px',
                            'border-color-input': '#ccc',
                            'line-height-input':'50px',
                            'space-inset-input':'0 16px',
                            'color-label':'#aaa',
                            'font-size-label':'14px',
                            'space-outset-input':'5px 0 0 0',
                        },
                        // livestatus: 1,
                        submitCallback: (data)=>{
                            // console.log("Token",data?.jwt);
                            let checkBox = document.getElementById("term-checkbox");

                            if (checkBox.checked == true){


                                // console.log('Redirect');
                                // console.log(window.location.hostname);




                                /* Redirection Code */
                                const payload = {
                                    "action": "submit",
                                    "data": {
                                        "token": data?.jwt,
                                        "name": "Cardholder Name"
                                    }
                                };
                                // console.log("Token",data?.jwt);

                                let urlSt = localStorage.getItem('stUrl');
                                let flowIdSt = localStorage.getItem('flowId');
                                let instancesIdSt = localStorage.getItem('instancesId');


                                fetch('' + urlSt + '/flow/' + flowIdSt + '/instances/' + instancesIdSt + '', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(payload)
                                })
                                .then((res) => {

                                    if (res.status === 200) {
                                        res.json().then((response) => {
                                            // console.log("Total response", response);
                                            // console.log("Hostname", window.location.hostname);

                                            // window.location = '' + window.location.hostname + '/sign-contract';
                                            window.location = '/sign-contract';
                                            // localStorage.setItem("currentStep",'Documents');
                                        });

                                    }

                                })
                                .then((data) => console.log(data));
                                /* Redirection Code end */



                                
                

                            } else {
                                // console.log('Dont Redirect');
                                // console.log(window.location.hostname+'/sign-contract');

                                termError.classList.remove("dnone");

                                let payBtn = document.getElementById("update-amount");
                                payBtn.classList.remove("st-button-submit__disabled");
                                payBtn.disabled = false;

                            }
                            // console.log("Token1",data?.jwt);


                            // localStorage.setItem("DATA",data);
                            // localStorage.setItem("jwtStToken",JSON.stringify(data?.jwt));


                        },
                        submitOnSuccess:false
                    });
                    st.Components({"requestTypes":["ACCOUNTCHECK"]});

                })()`;
                    document.body.appendChild(script_tag);

                }, 1000);




                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

            })
            .catch((error) => {
                console.log(error);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

            });
        /* fetch JWT token end */


        /* form service */
        formService.inputEmptyCheck();
        /* form service end */

    }, [])



    return (
        <div>

            {/* Header Starts */}
            <Header />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <InnerBgComp classes={"inner-bg-img"} />

                <div className="container">
                    {/* start */}
                    <div className="welcome-box">
                        <motion.div
                            initial={{ y: 60, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="welcome-right">
                            {/* start */}
                            <ApprovedLoadComp />
                            {/* end */}
                        </motion.div>
                        <motion.div
                            initial={{ y: 60, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="welcome-left">
                            {/* start */}
                            <div className="comm-box">
                                <div className="comm-hdn-box">
                                    <h3 className="comm-hdn">
                                        Where we take the payments from?
                                    </h3>
                                    <div className="comm-para">
                                        <p>Please provide your card details.</p>
                                    </div>
                                </div>

                                {/* Trust payment */}
                                <div className='trustpay-form'>
                                    {/* <div id="st-notification-frame"></div> */}
                                    <form id="st-form">
                                        <div className="card-img">
                                            <img src={`${REACT_APP_PUBLIC_URL}/img/visa.svg`} alt="" />
                                        </div>

                                        <div className="row">
                                            <div className="w100">
                                                <div id="st-card-number" className="st-card-number tp-input"></div>
                                            </div>
                                            <div className="w50">
                                                <div id="st-expiration-date" className="st-expiration-date tp-input"></div>
                                            </div>
                                            <div className="w50">
                                                <div id="st-security-code" className="st-security-code tp-input"></div>
                                            </div>
                                        </div>


                                        <div className='mb24'>
                                            <div className="check-box mb0">
                                                <input type="checkbox"
                                                    name="termCheckbox"
                                                    id="term-checkbox"
                                                />
                                                <label className="check-label" htmlFor="term-checkbox">
                                                    I have read and agree with the <a href="#!" onClick={() => setTermModal(true)}>terms</a> & <a href="#!" onClick={() => setPrivacyModal(true)}>privacy</a> and to receive Credistar updates and offers.
                                                </label>
                                            </div>
                                            <p className='normalErrorMsg dnone' id='term-error'>Term and condition field required.</p>
                                        </div>

                                        <button
                                            type="submit"
                                            id="update-amount"
                                            className="button button--block"
                                        >
                                            Continue
                                        </button>
                                    </form>
                                </div>
                                {/* Trust payment end */}

                            </div>
                            {/* end */}
                        </motion.div>
                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}




            {/* Term popup */}
            <Modal
                className="comm-modal"
                show={termModal}
                onHide={() => setTermModal(false)}
            >
                <PopupContentComp
                    modalTitle={"Terms and Conditions"}
                    //   date={updateDate}
                    modalContent={termDocument}
                    onClick={() => setTermModal(false)}
                />
            </Modal>
            {/* Term popup end */}

            {/* Privacy popup */}
            <Modal
                className="comm-modal"
                show={privacyModal}
                onHide={() => setPrivacyModal(false)}
            >
                <PopupContentComp
                    modalTitle={"Privacy Policy"}
                    //   date={updateDate}
                    modalContent={privacyDocument}
                    onClick={() => setPrivacyModal(false)}
                />
            </Modal>
            {/* Privacy popup end */}


        </div >

    )
}

export default CardDetail