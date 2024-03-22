const formatDueDate = (date) => {
  const dueDate = new Date(date);

  // Define options for formatting the date
  const options = {
    weekday: 'short', // Abbreviated weekday name (e.g., "Thu")
    month: 'short', // Abbreviated month name (e.g., "Mar")
    day: 'numeric', // Day of the month (e.g., "25")
  };

  // Format the due date using the specified options
  return dueDate.toLocaleDateString('en-US', options);
};
export default formatDueDate;
