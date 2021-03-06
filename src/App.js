import React, { useState } from 'react';
import { Catalog } from './components/catalog';
import classes from './App.module.scss';
import { Sidebar } from './components/sidebar';
import { Navbar } from './components/navbar';
import { Details } from './components/details';
import { Form } from './components/form';
import { Report } from './components/report';
import { Modal } from './components/modal';
import { ModalProvider } from './context/ModalContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [confirmButtonAction, setConfirmButtonAction] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const context = {
    showModal,
    setShowModal,
    setConfirmButtonAction,
  }

  return (
    <Router>
      <ModalProvider value={context}>
        <div className="App">
          <Navbar />
          <Modal 
            showModal={showModal} 
            setShowModal={setShowModal}
            confirmButtonAction={confirmButtonAction} />
          <Switch>
            <Route
              path={`/`}
              exact
              render={_ => (
                <div className={classes.content}>
                  <Sidebar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
                  <Catalog search={search} filter={filter} />
                </div>
              )}
            />
            <Route
              exact
              key={Math.random()}
              path={`/books/:id/details`}
              render={_ => 
                (
                  <div className={classes.formContent}>
                    <Details />
                  </div>
                )}
            />
            <Route
              exact
              key={Math.random()}
              path={`/books/new`}
              render={_ => 
                (
                  <div className={classes.formContent}>
                    <Form />
                  </div>
                )}
            />
            <Route
              exact
              path={`/books/:id/edit`}
              render={_ => 
                (
                  <div className={classes.formContent}>
                    <Form />
                  </div>
                )}
            />
            <Route
              exact
              path={`/books/report`}
              render={_ => 
                (
                  <div className={classes.tableContent}>
                    <Report />
                  </div>
                )}
            />
          </Switch>
        </div>
      </ModalProvider>
    </Router>
  );
}

export default App;
