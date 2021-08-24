import API from '../../api/index';

export const fetchAllItems = () => ({
  type: 'FETCH_ALL_ITEMS',
  payload: API.items.all(),
});

export const fetchItem = (id) => ({
  type: 'FETCH_ITEM',
  payload: API.items.get(id),
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
