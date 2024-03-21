import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './components/login/Login';
import { useSelector, useDispatch } from 'react-redux';
import { pageLoad } from './reducers/userReducer';
import { initTaskLists, setCase } from './reducers/tasklistsReducer';

/**
 * Importing other components
 */
import Home from './components/Home';
import ExpandedTaskList from './components/tasklist/ExpandedTaskList';

const App = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Perform localStorage check on first load (auto-login)
  useEffect(() => {
    dispatch(pageLoad()); // Initialize user
  }, []);

  // Initializes Task Lists if user is logged in
  useEffect(() => {
    if (user) {
      dispatch(initTaskLists(user.id));
    } else {
      dispatch(setCase([]));
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Login />
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
