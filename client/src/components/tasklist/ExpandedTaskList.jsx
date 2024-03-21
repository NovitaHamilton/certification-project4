import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Task from '../task/Task';
import Button from '../common/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ExpandedTask from '../task/ExpandedTask';
import TaskForm from '../task/TaskForm';
import { deleteTasklist, editTasklist } from '../../reducers/tasklistsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { initTask, setCase } from '../../reducers/tasksReducer';

function ExpandedTaskList() {
  // State to track whether Task List is in editing mode or not
  const [isTasklistEditing, setIsTasklistEditing] = useState(false);
  // State to track edited name
  const [editedName, setEditedName] = useState('');
  // State to track the Expanded Task Id
  const [expandedTaskId, setExpandedTaskId] = useState();
  // State to track if AddTaskForm open
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);

  const tasklists = useSelector((store) => store.tasklists);
  const tasks = useSelector((store) => store.tasks);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Reset expandedTaskId when user navigates to a different task list (id change)
  useEffect(() => {
    setExpandedTaskId(null);
  }, [id]);

  // Find the task list with the specified ID
  const tasklist = tasklists.find((tasklist) => tasklist.id === id);

  // Initialize tasks if tasklist is available
  useEffect(() => {
    if (tasklist) {
      dispatch(initTask(tasklist.id));
    } else {
      dispatch(setCase([]));
    }
  }, [tasklist]);

  // onClick Functions

  const handleCloseTaskList = (e) => {
    e.preventDefault();
    navigateToTasksLists();
  };

  const handleDeleteTaskList = (e) => {
    e.preventDefault();
    dispatch(deleteTasklist(user.id, tasklist.id));
    navigateToTasksLists();
  };

  const handleEditTaskList = (e) => {
    e.preventDefault();
    setIsTasklistEditing(true);
    setEditedName(tasklist.name);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    dispatch(editTasklist(tasklist.id, editedName));
    setIsTasklistEditing(false);
  };

  const handleSaveToLocalStorage = (e) => {
    e.preventDefault();
    localStorage.setItem('tasklists', JSON.stringify(tasklists));
  };

  const handleToggleExpandedTask = (e, taskId) => {
    // Check if the event is triggered from 'close-icon'
    if (e && e.target.classList.contains('close-icon')) {
      setExpandedTaskId(null); // Close expanded task
    } else {
      setExpandedTaskId(taskId === expandedTaskId ? expandedTaskId : taskId);
    }
  };

  const navigateToTasksLists = () => {
    navigate(`/tasklists`);
  };

  const openAddTaskForm = () => {
    setIsAddTaskFormOpen(true);
  };

  return (
    <div className="expanded-tasklist">
      <CloseIcon
        className="tasklist-close-icon"
        onClick={handleCloseTaskList}
      />
      <div className="tasklist-header">
        {isTasklistEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <h2>{tasklist.name}</h2>
        )}

        <div className="edit-delete-icons">
          {isTasklistEditing ? (
            <Button
              className="save-tasklist-edit-button"
              onClick={handleSaveEdit}
            >
              Save Edit
            </Button>
          ) : (
            <EditIcon onClick={handleEditTaskList} />
          )}
          <DeleteIcon onClick={handleDeleteTaskList} />
        </div>
      </div>
      {isAddTaskFormOpen ? (
        <TaskForm
          tasklist={tasklist}
          setIsAddTaskFormOpen={setIsAddTaskFormOpen}
        />
      ) : (
        <Button className="add-task-button" onClick={openAddTaskForm}>
          Add Task
        </Button>
      )}
      <div className="tasks-container">
        <ul>
          {/* Render tasks for the individual task list*/}
          {tasks.map((task) => (
            <li
              key={task.id}
              role="button"
              onClick={(e) => handleToggleExpandedTask(e, task.id)}
            >
              {expandedTaskId !== task.id ? (
                <Task task={task} />
              ) : (
                <ExpandedTask
                  tasklist={tasklist}
                  task={task}
                  handleToggleExpandedTask={handleToggleExpandedTask}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="export-json-button">
        <Button onClick={handleSaveToLocalStorage}>Save to localStorage</Button>
      </div>
    </div>
  );
}

export default ExpandedTaskList;
