const user = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_USERS_FULFILLED': return action.payload;
    default: return state;
  }
};

export default user;
