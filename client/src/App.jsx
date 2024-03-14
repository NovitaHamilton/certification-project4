import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/login/Login';

/**
 * Importing other components
 */
import Home from './components/Home';
import ExpandedTaskList from './components/tasklist/ExpandedTaskList';

const App = () => {
  const [user, setUser] = useState({ name: 'Novita C' });

  return (
    <div className="App">
      <Router>
        <Login user={user} />
        {user ? (
          <div>
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
          </div>
        ) : null}
      </Router>
    </div>
  );
};

export default App;
