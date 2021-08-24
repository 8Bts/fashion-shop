import { combineReducers } from 'redux';
import items from './item';
import users from './user';
import categories from './category';

export default combineReducers({ items, users, categories });
