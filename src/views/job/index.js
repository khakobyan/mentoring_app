import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import FormButton from '../../components/FormButton';
import { AuthContext } from '../../navigation/AuthProvider';
import { heightPercentageToDP, widthPercentageToDP } from '../../utils/sizes';
import database from '@react-native-firebase/database';

export default function JobInfoScreen({navigation}) {
  const { user } = useContext(AuthContext);
  const [department, setDepartment] = useState(user.department || '');
  const [job_title, setJobTitle] = useState(user.job_title || '');
  const [job_description, setJobDescription] = useState(user.job_description || '');

  const updateUser = () => {
    database()
    .ref(`/users/${user.key}`)
    .update({department, job_title, job_description})
    .then(() => navigation.navigate('Home'))
  }

  return (
    <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps='always' directionalLockEnabled={false} collapsable={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <ScrollView
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputsContainer}>
          <CustomInput labelValue={'Department'} value={department} onChange={userDepartment => setDepartment(userDepartment)}/>
          <CustomInput labelValue={'Job Title'} value={job_title} onChange={userJobTitle => setJobTitle(userJobTitle)}/>
          <CustomInput labelValue={'Job Desc.'} value={job_description} onChange={userJobDescription => setJobDescription(userJobDescription)}/>
        </View>
        <View style={{alignItems: "center", marginTop: heightPercentageToDP('5')}}>
          <FormButton
            buttonTitle='Save'
            onPress={updateUser}
          />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    marginTop: heightPercentageToDP('2'),
    paddingHorizontal: widthPercentageToDP('2'),
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
