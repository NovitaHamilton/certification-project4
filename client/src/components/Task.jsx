function Task({ task }) {
  return (
    <div className="task-item">
      <p className="task-name">{task.name}</p>
      <p className="task-info">{task.priority}</p>
      <p className="task-info">{task.dueDate}</p>
      <p className="task-info">{task.status}</p>
    </div>
  );
}

export default Task;
