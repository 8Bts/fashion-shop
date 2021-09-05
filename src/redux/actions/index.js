import API from '../../api/index';

export const logUser = (user) => {
  window.localStorage.setItem('currentUser', JSON.stringify(user));

  return {
    type: 'USER_LOGGED_IN',
    user,
  };
};

export const fetchAllItems = () => ({
  type: 'FETCH_ALL_ITEMS',
  payload: API.items.all(),
});

export const fetchItem = (id) => ({
  type: 'FETCH_SINGLE_ITEM',
  payload: API.items.get(id),
});

export const setSingleItem = (item) => ({
  type: 'SET_SINGLE_ITEM',
  payload: item,
});

export const setItems = (items) => ({
  type: 'SET_ITEMS',
  payload: items,
});

export const fetchAllCategories = () => ({
  type: 'FETCH_ALL_CATEGORIES',
  payload: API.categories.all(),
});

export const fetchCategory = (id) => ({
  type: 'FETCH_CATEGORY',
  payload: API.categories.get(id),
});

export const fetchAllUsers = () => ({
  type: 'FETCH_ALL_USERS',
  payload: API.categories.all(),
});

export const fetchUser = (id) => ({
  type: 'FETCH_USER',
  payload: API.categories.get(id),
});

export const setCategory = (category) => ({
  type: 'SET_CATEGORY',
  category,
});

export const setCursor = (index) => ({
  type: 'SET_CURSOR',
  index,
});
