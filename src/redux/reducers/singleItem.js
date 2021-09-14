const singleItem = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SINGLE_ITEM_FULFILLED': return action.payload;
    case 'SET_SINGLE_ITEM': return action.payload;
    default: return state;
  }
};

export default singleItem;
