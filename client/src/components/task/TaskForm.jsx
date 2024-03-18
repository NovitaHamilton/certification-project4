import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SourceIcon from '@mui/icons-material/Source';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FlagIcon from '@mui/icons-material/Flag';
import { statusOptions, priorityOptions } from '../../../data/TaskFormOptions';
import Button from '../common/Button';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../../reducers/tasksReducer';

function TaskForm({
  tasklist,
  setIsAddTaskFormOpen,
  taskToEdit,
  setIsTaskEditing,
}) {
  const [formInput, setFormInput] = useState({
    name: '',
    dueDate: '',
    // taskList: tasklist.name,
    status: '',
    priority: '',
  });

  const dispatch = useDispatch();
  // const tasklists = useSelector((store) => store.tasklists);

  // If there's taskToEdit detected, the form input will be populated by the taskToEdit object
  useEffect(() => {
    if (taskToEdit) {
      setFormInput(taskToEdit);
    }
  }, [taskToEdit]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: taskToEdit ? taskToEdit.id : uuidv4(),
      name: formInput.name,
      dueDate: formInput.dueDate,
      status: formInput.status,
      priority: formInput.priority,
    };

    const taskListId = tasklist.id;
    const taskId = newTask.id;
    console.log(taskId);

    if (taskToEdit) {
      dispatch(editTask({ taskListId, newTask }));
    } else {
      dispatch(addTask({ taskListId, newTask }));
    }
    // Reset formInput
    setFormInput({
      name: '',
      dueDate: '',
      taskList: '',
      status: '',
      priority: '',
    });

    // Close Task Form
    closeTaskForm();
  };

  const handleCloseTaskForm = (e) => {
    e.preventDefault();
    // Close Task Form
    closeTaskForm();
  };

  const closeTaskForm = () =>
    taskToEdit ? setIsTaskEditing(false) : setIsAddTaskFormOpen(false);

  return (
    <form className="add-task-form" onSubmit={handleSaveTask}>
      <div className="above-task-header">
        <div className="task-form-header">
          <input
            name="name"
            type="text"
            placeholder="Add Title"
            value={formInput.name}
            onChange={handleInputChange}
            required
          ></input>
          <label>
            Due date:
            <input
              name="dueDate"
              type="date"
              value={formInput.dueDate}
              onChange={handleInputChange}
              required
            ></input>
          </label>
        </div>
        <CloseIcon className="close-icon" onClick={handleCloseTaskForm} />
      </div>
      {/*<label className="task-form-details">
        <SourceIcon />
        <select
          name="taskList"
          value={formInput.taskList}
          onChange={handleInputChange}
        >
          <option value="">{tasklist.name}</option>
          {tasklists
            .filter((list) => list.id !== tasklist.id)
            .map((list) => (
              <option key={list.id} value={list.name}>
                {list.name}
              </option>
            ))}
        </select>
            </label>*/}
      <label className="task-form-details">
        <CheckCircleOutlineIcon />
        <select
          name="status"
          value={formInput.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <label className="task-form-details">
        <FlagIcon />
        <select
          name="priority"
          value={formInput.priority}
          onChange={handleInputChange}
          required
        >
          <option value="">Select priority</option>
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">Save Task</Button>
    </form>
  );
}

export default TaskForm;
