import { combineReducers } from 'redux';
import employees from './employees';
import groups from './groups';

export default combineReducers({
   employees,
   groups
})