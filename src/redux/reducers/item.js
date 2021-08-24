const item = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_ITEMS_FULFILLED': return action.payload;
    default: return state;
  }
};

export default item;
