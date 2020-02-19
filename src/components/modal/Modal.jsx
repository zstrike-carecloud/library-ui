import React, { useState } from 'react';
import classes from './Modal.module.scss';

const axios = require('axios').default;

const Modal = ({ showModal, setShowModal, confirmButtonAction }) => {
    const [borrower, setBorrower] = useState('');

    const onConfirmation = async _ => {
        setShowModal(false);
        await confirmButtonAction(borrower);
        setBorrower('');
    }

    const onCancel = _ => {
        setBorrower('')
        setShowModal(false);
    }

    return (
        <div className={classes.modal} style={{ display: showModal ? 'block' : 'none' }}>
            <div className={classes.modalContentBox}>
                <div>
                    <p className={classes.header}>Who is checking out this book?</p>
                    <div>
                        <input value={borrower} onChange={e => setBorrower(e.target.value)}></input>
                    </div>
                    <div className={classes.buttonContainer}>
                        <div onClick={onConfirmation}>CHECK OUT</div>
                        <div className={classes.cancelButton} onClick={onCancel}>CANCEL</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;