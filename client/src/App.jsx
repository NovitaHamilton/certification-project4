import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';

/**
 * Importing other components
 */
import Home from './components/Home';
import ExpandedTaskList from './components/ExpandedTaskList';

const App = () => {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/tasklists">Task Lists</Link>
            </li>
          </ul>
        </nav>
        <div className="main-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasklists/" element={<Home />} />

            {/* Render both Home and IndividualTaskList components */}
            <Route
              path="/tasklists/:id"
              element={
                <>
                  <Home />
                  <ExpandedTaskList />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
