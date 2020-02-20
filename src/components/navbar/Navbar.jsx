import React from 'react';
import classes from './Navbar.module.scss';
import logo from './Logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={classes.container}>
            <img src={logo} alt="logo" />
            <NavLink exact activeStyle={{ color: '#FFB300' }} to="/">BOOKS</NavLink>
            <NavLink activeClassName={classes.disabled} to="/">TASKS</NavLink>
            <NavLink activeClassName={classes.disabled} to="/">MESSAGES</NavLink>
            <div className={classes.right}>
                <NavLink to="/books/report">Report</NavLink>
                <NavLink className={classes.addBookButton} to="/books/new">
                    <div>ADD BOOK</div>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;