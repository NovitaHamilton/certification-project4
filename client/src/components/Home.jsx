import TaskLists from './tasklist/TaskLists';
import React, { useEffect } from 'react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCase,
  addTasklist,
  initTaskLists,
  loadLocalStorage,
} from '../reducers/tasklistsReducer';

function Home() {
  const dispatch = useDispatch(); // To access dispatch() function
  const navigate = useNavigate(); // To access navigate function
  const user = useSelector((store) => store.user); // To access 'user' state in Redux store

  const handleAddTaskList = async (e) => {
    e.preventDefault();
    const newTaskList = {
      name: 'New Task List',
      tasks: [],
    };
    const savedTaskList = await dispatch(addTasklist(user.id, newTaskList));
    navigate(`/tasklists/${savedTaskList.id}`); // to navigate to the newly created Task List route
  };

  const handleLoadLocalStorage = (e) => {
    e.preventDefault();
    // Retrieve data from localStorage
    const storedTasklists = localStorage.getItem('tasklists');
    if (storedTasklists) {
      // Parse JSON string into an array of task lists
      const parsedTasklists = JSON.parse(storedTasklists);
      console.log('Parsedtasklist:', parsedTasklists);
      // Update state with the loaded task lists
      dispatch(loadLocalStorage(parsedTasklists));
    } else {
      // If no data found in localStorage, display error message
      console.error('No data found in localStorage');
    }
  };

  return (
    <div className="Home">
      <h1>My Task Lists</h1>
      <div className="tasklists-buttons">
        <Button onClick={handleAddTaskList}>Add Task List</Button>
        <Button onClick={handleLoadLocalStorage}>Load localStorage</Button>
      </div>
      <div>
        <TaskLists />
      </div>
    </div>
  );
}

export default Home;
