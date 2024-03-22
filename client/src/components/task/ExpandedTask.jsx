import React, { useState } from 'react';
import Button from '../common/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SourceIcon from '@mui/icons-material/Source';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FlagIcon from '@mui/icons-material/Flag';
import TaskForm from './TaskForm';
import { useDispatch } from 'react-redux';
import { deleteTaskAction } from '../../reducers/tasksReducer';
import formatDueDate from '../../utils/formatDuedate';

function ExpandedTask({ task, tasklist, handleToggleExpandedTask }) {
  const [isTaskEditing, setIsTaskEditing] = useState(false);
  const dispatch = useDispatch();

  const handleCloseTask = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggleExpandedTask(e);
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    setIsTaskEditing(true);
  };

  const markTaskComplete = (e) => {
    e.preventDefault();
  };

  const handleDeleteTask = (e) => {
    e.preventDefault();
    const taskListId = tasklist.id;
    const taskId = task.id;
    console.log('From handleDeleteTask:', taskListId, taskId);
    dispatch(deleteTaskAction(taskId, taskListId));
  };

  return (
    <div className="expanded-task">
      {!isTaskEditing ? (
        <>
          <div className="above-task-header">
            {/* <Button onClick={markTaskComplete}>Mark as Complete</Button> */}
            <CloseIcon className="close-icon" onClick={handleCloseTask} />
          </div>
          <div className="task-header">
            <div>
              <h2>{task.name}</h2>
              <p>Due date: {formatDueDate(task.dueDate)}</p>
            </div>

            <div className="edit-delete-icons">
              <EditIcon onClick={handleEditTask} />
              <DeleteIcon onClick={handleDeleteTask} />
            </div>
          </div>
          <div className="task-details">
            {/* <p>
              <SourceIcon />
              {tasklist.name}
            </p> */}
            <p>
              <CheckCircleOutlineIcon />
              {task.status}
            </p>

            <p>
              <FlagIcon />
              {task.priority}
            </p>
          </div>
        </>
      ) : (
        <TaskForm
          tasklist={tasklist}
          setIsTaskEditing={setIsTaskEditing}
          taskToEdit={task}
        />
      )}
    </div>
  );
}

export default ExpandedTask;
