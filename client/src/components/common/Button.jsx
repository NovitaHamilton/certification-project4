import React from 'react';

function Button({ children, onClick }) {
  //'children' represents the content inside the 'Button' component, between the opening and closing tags, special prop from React
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
