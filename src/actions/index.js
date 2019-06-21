/**
 * @name index.js
 * @description actions/index.js
 */
import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';
/**
 * async await syntax is no bueno w/ redux
 * requires middleware.
 * async returns a request, not plain js obj.
 */
/**
 * async action creator using thunk.
 * fancy syntax eliminating return statement and {}
 * function that returns an async function taking 
 * dispatch as argument
 */
// fetchPostsAndUsers, calls both action creators
// must return a function such that redux thunk
// invokes the function returned by dispatch, in this case
// fetchPosts() && fetchUser()
// alternate version of memoizing
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // lodash chaining refactor
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach((id) => {
      dispatch(fetchUser(id));
    })
    .value();
}
/**
 * fetchPosts async action creator
 */
export const fetchPosts = (/*args*/) => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({ 
      type: 'FETCH_POSTS', 
      payload: response.data
    });
}
/**
 * fetchUser action creator
 * @param id 
 * 
 * private function _fetchUser action creator
 * memoized for network noise added below
 */
export const fetchUser = (id) => async dispatch => {
// _fetchUser private helper function
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  });
};

// memoized async action creator method
// export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);
// // _fetchUser private helper function
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({
//     type: 'FETCH_USER',
//     payload: response.data
//   });
// });