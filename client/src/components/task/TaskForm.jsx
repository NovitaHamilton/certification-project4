import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FlagIcon from '@mui/icons-material/Flag';
import { statusOptions, priorityOptions } from '../../../data/TaskFormOptions';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { addTaskAction, editTaskAction } from '../../reducers/tasksReducer';

function TaskForm({
  tasklist,
  setIsAddTaskFormOpen,
  taskToEdit,
  setIsTaskEditing,
}) {
  const [formInput, setFormInput] = useState({
    name: '',
    dueDate: new Date(), // Default to current date
    status: '',
    priority: '',
  });

  const dispatch = useDispatch();

  // If there's taskToEdit detected, the form input will be populated by the taskToEdit object
  useEffect(() => {
    if (taskToEdit) {
      // Convert the task's dueDate to a Date object
      const dueDate = new Date(taskToEdit.dueDate);
      // Set the time to 00:00:00 to ensure consistency
      dueDate.setHours(0, 0, 0, 0);
      setFormInput({
        ...taskToEdit,
        dueDate: dueDate,
      });
    }
  }, [taskToEdit]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    // Format the due date
    const newTask = {
      name: formInput.name,
      dueDate: formInput.dueDate,
      status: formInput.status,
      priority: formInput.priority,
    };

    const taskListId = tasklist.id;

    if (taskToEdit) {
      newTask.id = taskToEdit.id;
      dispatch(editTaskAction(newTask));
    } else {
      dispatch(addTaskAction(taskListId, newTask));
    }
    // Reset formInput
    setFormInput({
      name: '',
      dueDate: new Date(), // Default to current date
      taskList: '',
      status: '',
      priority: '',
    });

    closeTaskForm();
  };

  const handleCloseTaskForm = (e) => {
    e.preventDefault();
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
            <DatePicker
              name="dueDate"
              selected={formInput.dueDate}
              onChange={(date) => setFormInput({ ...formInput, dueDate: date })}
              dateFormat="eee, MMM dd, yyyy"
              required
            />
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
