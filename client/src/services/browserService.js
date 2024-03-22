// Local Storage helper function

const storeUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user'));
};
const removeUserFromStorage = () => {
  return localStorage.removeItem('user');
};

export { storeUser, getUserFromStorage, removeUserFromStorage };
