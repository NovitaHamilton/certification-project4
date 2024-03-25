import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TaskLists() {
  const tasklists = useSelector((store) => store.tasklists);

  return (
    <div className="task-lists">
      <ul className="task-list-container">
        {tasklists.map((tasklist) => (
          <li key={tasklist.id} className="task-list-item">
            <Link to={`/tasklists/${tasklist.id}`} className="task-list-link">
              {tasklist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskLists;
