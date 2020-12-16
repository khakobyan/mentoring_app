import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import ErrorMessage from '../../components/ErrorMessage';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP } from '../../utils/sizes';
import Geolocation from '@react-native-community/geolocation';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [location, setLocation] = useState({});
  const [file_name, setFileName] = useState('');
  const { authError, register, setAuthError } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (res) => {
        const latitude = res.coords.latitude.toFixed(5).toString();
        const longitude = res.coords.longitude.toFixed(5).toString();
        setLocation({latitude, longitude})
      },
      (err) => {console.log(err)},
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }
    );
    const unsubscribe = navigation.addListener('blur', () => {
      setAuthError('');
    })
    return unsubscribe;
  }, [navigation])
  return (
    <KeyboardAwareScrollView centerContent={true} keyboardDismissMode='interactive' keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>
        <FormInput
          value={first_name}
          placeholderText='First Name'
          onChangeText={userFirstName => setFirstName(userFirstName)}
          secureTextEntry={true}
        />
        <FormInput
          value={last_name}
          placeholderText='Last Name'
          onChangeText={userLastName => setLastName(userLastName)}
          secureTextEntry={true}
        />
        <FormInput
          value={email}
          placeholderText='Email'
          onChangeText={userEmail => setEmail(userEmail)}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
        <FormInput
          value={password}
          placeholderText='Password'
          onChangeText={userPassword => setPassword(userPassword)}
          secureTextEntry={true}
        />
        <ErrorMessage message={authError} />
        <FormButton
          buttonTitle='Signup'
          onPress={() => register(email, password, first_name, last_name, location, file_name)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthPercentageToDP('15')
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  }
});
