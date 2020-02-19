import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classes from './Details.module.scss';
import noCover from './Placeholder_Lg.svg';

const axios = require('axios').default;

const Details = (props) => {
    const history = useHistory();
    const [details, setDetails] = useState()
    const { id } = useParams();

    console.log('PARAMS', id);

    useEffect(_ => {
        const fetchData = async () => {
            const { data } = await axios({
                method: 'get',
                url: `http://localhost:3000/books/${id}`,
            });
            setDetails(data.books[0]);
          };
          fetchData();
    }, []);

    const checkInOut = async _ => {
        await axios({
            method: 'put',
            url: `http://localhost:3000/books/${details.id}/${details.status ? 'checkout' : 'checkin'}`,
        });
        setDetails({ ...details, status: details.status ? 0 : 1 })
    };

    return (
        <div className={classes.container}>
            <div className={classes.edit} onClick={_ => history.push(`/books/${id}/edit`)}>EDIT</div>
            <div className={classes.checkInOutButton} onClick={checkInOut}>{(details && details.status) ? 'CHECK OUT' : 'CHECK IN'}</div>
            <img className={classes.cover} src={(details && details.image) ? details.image : noCover} />
            <h3 className={classes.title}>{details && details.title}</h3>
            <p className={classes.author}>{details && details.author}</p>
            <p className={classes.synopsis}>{details && details.description}</p>
        </div>
    );
};

export default Details;