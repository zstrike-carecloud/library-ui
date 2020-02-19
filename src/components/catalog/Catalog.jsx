import React, { useState, useEffect } from 'react';
import { Card } from './card';
import classes from './Catalog.module.scss';
// import { instance } from '../../axios/client';

const axios = require('axios').default;

const Catalog = ({ search, filter }) => {
    const [books, setBooks] = useState();

    const updateBookStatus = (id, status) => {
        setBooks(books.map(book => {
            if (book.id === id) {
                book.status = status
            }
            return book;
        }));
    }

    useEffect(_ => {
        const fetchData = async () => {
            const { data } = await axios({
                method: 'get',
                url: 'http://localhost:3000/books',
            })
            setBooks(data.books);
          };
          fetchData();
    }, []);

    const searchFilter = (cards, book) => {
        const statusToNumber = {
            'available': 0,
            'checkedout': 1,
        }[filter];
        const searchLower = search.toLowerCase();
        let shouldAdd = false;
        if (book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower)) {
            shouldAdd = true;
        }
        if (filter !== 'all' && book.status !== statusToNumber) {
            shouldAdd = false;
        }
        shouldAdd && cards.push(<Card book={book} updateBookStatus={updateBookStatus} />)
        return cards;
    }

    return (
        <div className={classes.container}>
            {
                books && books.reduce((cards, book) => searchFilter(cards, book), [])
            }
        </div>
    );
};

export default Catalog;