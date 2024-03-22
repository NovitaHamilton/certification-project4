import TaskLists from './tasklist/TaskLists';
import React, { useEffect } from 'react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTasklist } from '../reducers/tasklistsReducer';

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

  return (
    <div className="Home">
      <h1>My Task Lists</h1>
      <div className="tasklists-buttons">
        <Button onClick={handleAddTaskList}>Add Task List</Button>
      </div>
      <div>
        <TaskLists />
      </div>
    </div>
  );
}

export default Home;
