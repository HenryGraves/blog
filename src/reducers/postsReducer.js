/**
 * @name postReducer.js
 * @description post reducer
 */
/**
 * Rules of Reducers
 * 
 * Must return any value besides undefined
 * 
 * Produces 'state' or data to be used inside of
 * your app using only previous state and action objs
 * 
 * Must not reach 'out of itself' (out of scope)
 * to decide what value to return 
 * ( pure reducers ) 
 * 
 * Can mutate state but its convention not to, one
 * corner case that causes an error
 * 
 */
export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
}
