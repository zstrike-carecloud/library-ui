import React from 'react';
import classes from './Navbar.module.scss';
import logo from './Logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={classes.container}>
            <img src={logo} alt="logo" />
            <NavLink activeClassName="in-use" to="/">BOOKS</NavLink>
            <NavLink to="#news">TASKS</NavLink>
            <NavLink to="#contact">MESSAGES</NavLink>
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