const user = JSON.parse(window.localStorage.getItem('currentUser'));

const currentUser = (state = user, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN': return action.user;
    default: return state;
  }
};

export default currentUser;
