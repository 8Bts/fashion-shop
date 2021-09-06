import { combineReducers } from 'redux';
import items from './item';
import categories from './category';
import currentUser from './auth';
import singleItem from './singleItem';
import filter from './filter';
import cursor from './cursor';

export default combineReducers({
  items, categories, currentUser, singleItem, filter, cursor,
});
