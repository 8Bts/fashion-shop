import categories from './category';
import cloudinary from './cloudinary';
import items from './item';
import users from './user';

const API = (() => ({
  categories,
  cloudinary,
  items,
  users,
}))();

export default API;
