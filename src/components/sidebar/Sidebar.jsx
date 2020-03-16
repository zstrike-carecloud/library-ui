import React, { useState } from 'react';
import classes from './Sidebar.module.scss';
import filterButton from './tune-24px.svg'

const Sidebar = ({ search, setSearch, filter, setFilter }) => {
    // TODO: Set strings to CONSTANTS
    const { innerWidth: width } = window;
    const [showFilters, setShowFilters] = useState(width > 450 ? true : false);

    return (
        <div className={classes.container}>
            <input className={classes.search} placeholder={'Search (tile or author)'} value={search} onChange={({ target: { value }}) => setSearch(value)} />
            <img onClick={_ => setShowFilters(!showFilters)} className={classes.filterButton} src={filterButton} alt="filterButton"></img>
            <p className={classes.title}>Filter By</p>
            <div style={{ display: showFilters ? 'flex' : 'none' }} className={classes.radioContainer}>
                <div className={classes.all}>
                    <input id="all" type="radio" name="filter" value={filter} onChange={({ target: { id }}) => setFilter(id)} checked={filter === 'all'} />
                    <label htmlFor="all">All</label>
                </div>
                <div className={classes.available}>
                    <input id="available" type="radio" name="filter" value={filter} onChange={({ target: { id }}) => setFilter(id)} checked={filter === 'available'} />
                    <label htmlFor="available">Available</label>
                </div>
                <div className={classes.checkedOut}>
                    <input id="checkedout" type="radio" name="filter" value={filter} onChange={({ target: { id }}) => setFilter(id)} checked={filter === 'checkedout'} />
                    <label htmlFor="checkedout">Checked Out</label>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;