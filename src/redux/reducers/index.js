import { combineReducers } from 'redux';
import items from './item';
import users from './user';
import categories from './category';
import currentUser from './auth';
import singleItem from './singleItem';
import filter from './filter';
import cursor from './cursor';

export default combineReducers({
  items, users, categories, currentUser, singleItem, filter, cursor,
});
