import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ErrorMessage from '../../components/ErrorMessage';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import { AuthContext } from '../../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authError, login, setAuthError } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setAuthError('');
    })
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Mentoring app</Text>
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
      <ErrorMessage message={authError}/>
      <FormButton buttonTitle='Login' onPress={() => login(email, password)} />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.navButtonText}>New user? Join here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee'
  }
});