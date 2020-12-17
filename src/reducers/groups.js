import { 
  SET_GROUPS,
  SET_GROUPS_LOADING
} from '../utils/action_types';

const INITIAL_STATE = {
  groups: [],
  loading: false
};
  
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };
    case SET_GROUPS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
