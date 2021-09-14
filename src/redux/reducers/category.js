const category = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_CATEGORIES_FULFILLED': return action.payload;
    default: return state;
  }
};

export default category;
