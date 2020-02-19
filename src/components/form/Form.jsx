import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import classes from './Form.module.scss';
import selectImage from './Placeholder.svg'

const axios = require('axios').default;

const Form = _ => {
    const history = useHistory();
    const [image, setImage] = useState();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const { id } = useParams();

    useEffect(_ => {
        if (id) {
            const fetchData = async () => {
                const { data } = await axios({
                    method: 'get',
                    url: `http://localhost:3001/books/${id}`,
                });
                const { title, author, isbn, image, description } = data.books[0];
                setTitle(title);
                setAuthor(author);
                setIsbn(isbn);
                setSynopsis(description);
                setImage(image);
              };
              fetchData();
        }
    }, []);

    const changeCover = e => {
        // TODO: Set size of file limit
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setImage(reader.result)
       }
    }

    const onSave = _ => {
        const saveData = async () => {
            if (id) {
                await axios({
                    method: 'put',
                    url: `http://localhost:3001/books/${id}`,
                    data: {
                        book: {
                            title,
                            author,
                            isbn,
                            image,
                            description: synopsis,
                        },
                    }
                });
                history.push(`/books/${id}/details`)
            } else {
                await axios({
                    method: 'post',
                    url: `http://localhost:3001/books/new`,
                    data: {
                        book: {
                            title,
                            author,
                            isbn,
                            image,
                            description: synopsis,
                        },
                    }
                });
                history.push(`/`);
            }
        };
        saveData();
    }

    const onDelete = _ => {
        const saveData = async () => {
            await axios({
                method: 'delete',
                url: `http://localhost:3001/books/${id}`,
            });
            history.push(`/`);
        }
        saveData();
    };

    return (
        <div className={classes.container}>
            <div>
                <label htmlFor="file-input" onChange={e => changeCover(e)}>
                    <img className={classes.cover} src={(image) ? image : selectImage} alt="upload" />
                </label>
                <input id="file-input" type="file" onChange={e => changeCover(e)} style={{ visibility: 'hidden' }} />
            </div>
            <div className={classes.delete} onClick={onDelete}>DELETE</div>
            <div className={classes.save} onClick={onSave}>SAVE</div>
            <div className={classes.form}>
                <div className={classes.title}>
                    <label>Title</label>
                    <input type="text" name="name" onChange={({ target: { value } }) => setTitle(value)} value={title} maxLength={50} />
                </div>
                <div className={classes.author}>
                    <label>Author</label>
                    <input type="text" name="name" onChange={({ target: { value } }) => setAuthor(value)} value={author} maxLength={50} />
                </div>
                <div className={classes.isbn}>
                    <label>Isbn</label>
                    <input type="text" name="name" onChange={({ target: { value } }) => setIsbn(value)} value={isbn} maxLength={13} />
                </div>
                <div className={classes.synopsis}>
                    <label>Synopsis</label>
                    <textarea className={classes.synopsis} name="name" onChange={({ target: { value } }) => setSynopsis(value)} value={synopsis} />
                </div>
            </div>
        </div>
    );
};

export default Form;