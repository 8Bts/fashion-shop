const cursor = (state = 0, action) => {
  switch (action.type) {
    case 'SET_CURSOR': return action.index;
    default: return state;
  }
};

export default cursor;
