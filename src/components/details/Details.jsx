import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classes from './Details.module.scss';
import noCover from './Placeholder_Lg.svg';
import { axiosClient } from '../../axios/client';
import { modalContext } from '../../context/ModalContext';

const Details = _ => {
    const history = useHistory();
    const [details, setDetails] = useState()
    const { id } = useParams();
    const { setShowModal, setConfirmButtonAction } = useContext(modalContext);

    useEffect(_ => {
        const fetchData = async () => {
            const { data } = await axiosClient.get(`/books/${id}`);
            setDetails(data.books[0]);
          };
          fetchData();
    }, [id]);

    const checkInOut = _ => {
        const updateStatus = async borrower => {
            await axiosClient.put(
                `/books/${details.id}/${details.status ? 'checkout' : 'checkin'}`,
                { book: { borrower }},
            );
            setDetails({ ...details, status: details.status ? 0 : 1 })
        };
        if (!details.status) {
            setShowModal(true);
            setConfirmButtonAction(_ => borrower => updateStatus(borrower));
        } else {
            updateStatus(null);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.edit} onClick={_ => history.push(`/books/${id}/edit`)}>EDIT</div>
            <div className={classes.checkInOutButton} onClick={checkInOut}>{(details && details.status) ? 'CHECK IN' : 'CHECK OUT'}</div>
            <img className={classes.cover} src={(details && details.image) ? details.image : noCover} alt="cover" />
            <h3 className={classes.title}>{details && details.title}</h3>
            <p className={classes.author}>{details && details.author}</p>
            <p className={classes.author}>ISBN: {details && details.isbn}</p>
            <p className={classes.synopsis}>{details && details.description}</p>
        </div>
    );
};

export default Details;