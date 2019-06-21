/**
 * @name index.js
 * @description reducers/index.js
 */
import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});