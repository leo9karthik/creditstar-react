import React from 'react'

/* plugin */
import DOMPurify from 'dompurify'
import moment from 'moment'
/* plugin end */

const PopupContentComp = ({ modalTitle, date, modalContent, onClick }) => {
    return (
        <>
            <div className="modal-close" onClick={onClick}>
                <i className="icon-close"></i>
            </div>

            <div className="modal-hdn-box">
                {modalTitle && <h1 className="modal-hdn">{modalTitle}</h1>}
                {date && <p className="modal-date-update">
                    Latest update: {moment(date).format("DD.MM.yyyy")}
                </p>}
            </div>

            {/* Modal content */}
            {modalContent && (
                <div
                    className="term-content"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(modalContent),
                    }}
                />
            )}
            {/* Modal content end */}

            <button
                className="button button--block"
                onClick={onClick}
            >
                Back
            </button>
        </>
    )
}

export default PopupContentComp

