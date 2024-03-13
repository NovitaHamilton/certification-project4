import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TaskLists() {
  const tasklists = useSelector((store) => store.tasklists);
  console.log(tasklists);

  return (
    <div className="task-lists">
      <ul>
        {tasklists.map((tasklist) => (
          <li key={tasklist.id}>
            <Link to={`/tasklists/${tasklist.id}`}>{tasklist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskLists;
