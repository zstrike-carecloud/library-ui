import React, { useState, useEffect } from 'react';
import { Card } from './card';
import classes from './Catalog.module.scss';
import { axiosClient, socketIoClient } from '../../axios/client';

const Catalog = ({ search, filter }) => {
    const [books, setBooks] = useState([]);
    console.log('BOOKSHERE', books);

    const updateBookStatus = (id, status) => {
        console.log('HERE', id, status, books);
        setBooks(
            books.map(book => {
                if (book.id === id) {
                    book.status = status;
                }
                return book;
            })
        );
    };

    // var connectionOptions =  {
    //     "force new connection" : true,
    //     "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    //     "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    //     "transports" : ["websocket"]
    // };

    useEffect(_ => {
        console.log('THIS1');
        const fetchData = async () => {
            const { data } = await axiosClient.get('/books');
            setBooks(data.books);
        };
        fetchData();
    }, []);

    useEffect(_ => {
        console.log(books);
        socketIoClient.on('checkBook', ({ books: { id, status } }) => {
            console.log('SOCKET1', id, status);
            console.log(books);
            updateBookStatus(Number(id), status);
        });
        return _ => socketIoClient.disconnect();
    }, [books]);

    // TODO: Clean up
    const searchFilter = (cards, book) => {
        const statusToNumber = {
            available: 0,
            checkedout: 1
        }[filter];
        const searchLower = search.toLowerCase();
        let shouldAdd = false;
        if (
            book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower)
        ) {
            shouldAdd = true;
        }
        if (filter !== 'all' && book.status !== statusToNumber) {
            shouldAdd = false;
        }
        shouldAdd &&
            cards.push(
                <Card book={book} updateBookStatus={updateBookStatus} />
            );
        return cards;
    };

    return (
        <div className={classes.container}>
            {books &&
                books.reduce((cards, book) => searchFilter(cards, book), [])}
        </div>
    );
};

export default Catalog;
