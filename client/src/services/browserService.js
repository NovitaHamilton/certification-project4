// Local Storage helper function

const storeUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
const removeUser = () => {
  return localStorage.removeItem(user);
};

export { storeUser, getUser, removeUser };
