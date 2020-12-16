import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../../components/FormButton';
import { sendEmail } from '../../helpers/send-email';
import { AuthContext } from '../../navigation/AuthProvider';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const [subject, setSubject] = useState(`${user.first_name} ${user.last_name}'s info`);

  const prepareAndSendEmail = () => {
    let tmp_str = '';
    for (var key in user) {
      if (user.hasOwnProperty(key) && !['key', 'uid', 'file_name'].includes(key)) {
        if (key == 'location') {
          tmp_str = tmp_str + `latitude: ${user[key].latitude}\n`+ `longitude: ${user[key].longitude}\n`
        } else {
          tmp_str = tmp_str + `${key}: ${user[key]}\n`
        }
      }
    }
    sendEmail('', subject, tmp_str)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Welcome  ${user.first_name} ${user.last_name}`}</Text>
      <FormButton buttonTitle='Share My Info' onPress={prepareAndSendEmail} /> 
      <FormButton buttonTitle='Logout' onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1'
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
