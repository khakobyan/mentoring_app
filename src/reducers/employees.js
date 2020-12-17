import { 
  SET_EMPLOYEES,
  SET_EMPLOYEES_LOADING
} from '../utils/action_types'

const INITIAL_STATE = {
  employees: [],
  loading: false
};
  
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
       employees: action.payload
      };
    case SET_EMPLOYEES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
