import { 
  SET_GROUPS,
  SET_GROUPS_LOADING,
} from '../utils/action_types';
import Storage from '../services/Storage';

export const setGroupsLoading = loading => {
  return {
    type: SET_GROUPS_LOADING,
    payload: loading
  }
}
  
export const fetchGroups = (user_id) => dispatch => {
  dispatch(setGroupsLoading(true));
  Storage.getGroups().then(res => {
    if (res) {
      dispatch({
        type: SET_GROUPS,
        payload: JSON.parse(res).filter(group => group.user_id == user_id)
      })
    } else {
      dispatch({
        type: SET_GROUPS,
        payload: []
      })
    }
    dispatch(setGroupsLoading(false));
  })
  .catch(e => {
    dispatch(setGroupsLoading(false));
    console.log('error groups', e)
  })
}

export const deleteGroup = (id, user_id) => dispatch => {
  dispatch(setGroupsLoading(true));
  Storage.getGroups().then(res => {
    let tmp_arr = JSON.parse(res);
    tmp_arr.splice(id, 1);
    Storage.setGroups(JSON.stringify(tmp_arr))
    .then(() => {
      dispatch(fetchGroups(user_id));
      dispatch(setGroupsLoading(false));
    })
    .catch(e => {
      dispatch(setGroupsLoading(false));
      console.log('e', e)
    })
  })
  .catch(e => {
    dispatch(setGroupsLoading(false));
    console.log('e', e)
  })
}