import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';
import database from '@react-native-firebase/database';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    if (user) {
      database()
      .ref(`/users`)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if(data[key].email == user?.email) {setUser(data[key])}
          } 
        }
        if (initializing) setInitializing(false);
        setLoading(false);
      }); 
    }
    else { 
      setUser(user)
      if (initializing) setInitializing(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
