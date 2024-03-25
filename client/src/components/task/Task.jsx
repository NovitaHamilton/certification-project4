import formatDueDate from '../../utils/formatDuedate';

function Task({ task }) {
  return (
    <div className="task-item">
      <div className="task-info task-name">{task.name}</div>
      <div className="task-info">{task.priority}</div>
      <div className="task-info">{formatDueDate(task.dueDate)}</div>
      <div className="task-info">{task.status}</div>
    </div>
  );
}

export default Task;
