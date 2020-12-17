import { 
  SET_EMPLOYEES,
  SET_EMPLOYEES_LOADING,
} from '../utils/action_types';
import storage from '@react-native-firebase/storage';
import csv from 'csvtojson';
import RNFetchBlob from 'rn-fetch-blob';

export const setEmployeesLoading = loading => {
	return {
		type: SET_EMPLOYEES_LOADING,
		payload: loading
	}
}

export const fetchEmployees = () => dispatch => {
  dispatch(setEmployeesLoading(true));
  let ref = storage().ref(`/employees.csv`);
  ref.getDownloadURL()
  .then(url => RNFetchBlob.fetch("GET", url)
    .then(res => { 
      csv().fromString(res.data)
      .then(obj => {
        obj.map(item => {
          item['job_title'] = item['job title'];
          delete item['job title'];
        })
        dispatch({
          type: SET_EMPLOYEES,
          payload: obj
        })
        dispatch(setEmployeesLoading(false));

      })
      .catch(e => {
        console.log('error file', e)
        dispatch(setEmployeesLoading(false));
      })
    })
    .catch(e => {
      console.log('error file', e)
      dispatch(setEmployeesLoading(false));
    })
  )
  .catch(e => {
    dispatch(setEmployeesLoading(false));
    console.log('error file', e)
  })
}