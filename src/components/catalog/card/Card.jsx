import React, { useContext } from 'react';
import classes from './Card.module.scss';
import placeholder from './Placeholder_SM.svg'
import { useHistory } from 'react-router-dom';
import { modalContext } from '../../../context/ModalContext';
import { axiosClient } from '../../../axios/client';

const Card = ({ book, updateBookStatus }) => {
    const history = useHistory();
    const { setShowModal, setConfirmButtonAction } = useContext(modalContext);

    const checkInOut = _ => {
        const call = async borrower => {
            await axiosClient.put(
                `/books/${book.id}/${book.status ? 'checkin' : 'checkout'}`,
                { book: { borrower }},
            );
            updateBookStatus(book.id, book.status ? 1 : 0); // 1
        };
        if (!book.status) {
            setShowModal(true);
            setConfirmButtonAction(_ => borrower => call(borrower));
        } else {
            call(null);
        }
    };

    return (
        <div className={classes.container}>
            <img onClick={_ => history.push(`/books/${book.id}/details`)} src={book.image ? book.image : placeholder} className={classes.cover} alt="cover" />
            <div className={classes.infoContainer}>
                <p className={classes.title}>{book.title}</p>
                <p className={classes.author}>{book.author}</p>
                <span className={classes.checkButtonContainer}>
                    <div onClick={checkInOut} className={classes.checkButton}>
                        {book.status ? 'CHECK IN' : 'CHECK OUT'}
                    </div>
                </span>
            </div>

        </div>
    );
};

export default Card;