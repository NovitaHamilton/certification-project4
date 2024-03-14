import TaskLists from './tasklist/TaskLists';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTaskList, loadLocalStorage } from '../reducers/tasklistsReducer';

function Home() {
  // To access global state
  // const tasklists = useSelector((store) => store.tasklists);
  // To access dispatch() function
  const dispatch = useDispatch();
  // To access navigate function
  const navigate = useNavigate();

  const handleAddTaskList = (e) => {
    e.preventDefault();
    const newTaskList = {
      id: uuidv4(),
      name: 'New Task List',
      tasks: [],
    };
    dispatch(addTaskList(newTaskList));
    navigate(`/tasklists/${newTaskList.id}`); // to navigate to the newTaskList route
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
