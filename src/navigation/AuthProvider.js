import React, { createContext, useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setAuthError,
        authError,
        login: async (email, password) => {
          try {
            if (email.length && password.length) {
              await auth().signInWithEmailAndPassword(email, password);
            } else {
              setAuthError('All fields are required')
            }
          } catch (e) {
            setAuthError(e.message)
            console.log(e);
          }
        },
        register: async (email, password, first_name, last_name, location, file_name) => {
          try {
            if (email.length && password.length && first_name.length && last_name.length) {
              const new_user = await (await auth().createUserWithEmailAndPassword(email, password)).user;
              const uid = await new_user.uid;
              const newReference = await database().ref('/users').push({email, uid, first_name, last_name, location, file_name});
              await database().ref(`/users/${newReference.key}`).update({key: newReference.key})
            } else {
              setAuthError('All fields are required')
            }
          } catch (e) {
            setAuthError(e.message)
            console.log(e.code);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
