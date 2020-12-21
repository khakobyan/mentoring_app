import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../components/FormButton';
import { AuthContext } from '../../navigation/AuthProvider';
import { heightPercentageToDP, widthPercentageToDP } from '../../utils/sizes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GREY, PURPLE, WHITE } from '../../utils/colors';
import {launchCamera} from 'react-native-image-picker';
import CustomInput from '../../components/CustomInput';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

export default function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState(user.email);
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [latitude, setLatitude] = useState(user.location.latitude);
  const [longitude, setLongitude] = useState(user.location.longitude);
  const [filePath, setFilePath] = useState({});
  const [file_name, setFileName] = useState(user.file_name);
  const [image_url, setImageUrl] = useState('');

  useEffect(() => {
    if (file_name.length) {
      let imageRef = storage().ref(`/${file_name}`);
      imageRef.getDownloadURL().then(url =>  setImageUrl(url)).catch(e => console.log('error image', e))
    }
  }, [])


  const uploadImage = () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
    };
    launchCamera(options, response => { 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response;
        setFilePath(source);
        setFileName(source.fileName);
      }
    });
  }

  const updateUser = async () => {
    const location = {latitude, longitude};
    if (email != user.email) {
      let user = auth().currentUser;
      user.updateEmail(email);
    }
    if (file_name != user.file_name) {
      if (user.file_name.length) {
        let imageRef = storage().ref(`/${user.file_name}`);
        imageRef.delete();
      }
      const reference = storage().ref(file_name);
      await reference.putFile(filePath.uri);
    }
    database()
    .ref(`/users/${user.key}`)
    .update({email, first_name, last_name, location, file_name})
    .then(() => {
      database().ref(`/users/${user.key}`).once('value').then(res => {
        setUser(res.val());
        navigation.navigate('Home');
      })
    })
  }

  return (
    <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps='always' directionalLockEnabled={false} collapsable={false} showsVerticalScrollIndicator={false} enableOnAndroid={true}>
      <ScrollView
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          { (filePath.fileName || image_url.length) ?
            <Image 
              style={{borderRadius: widthPercentageToDP('30')/2, overflow: 'hidden', width: widthPercentageToDP('30'), height: widthPercentageToDP('30')}}
              source={filePath.fileName ? filePath : {uri: image_url}}
            />
            : <Icon color={GREY} name="account" size={widthPercentageToDP('30')} />

          }
          <TouchableOpacity
            onPress={uploadImage}
            style={styles.editButtonContainer}
          >
            <Icon color={WHITE} name="pencil" size={widthPercentageToDP('5')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.inputsContainer}>
          <CustomInput labelValue={'Email'} value={email} onChange={userEmail => setEmail(userEmail)}/>
          <CustomInput labelValue={'First Name'} value={first_name} onChange={firstName => setFirstName(firstName)}/>
          <CustomInput labelValue={'Last Name'} value={last_name} onChange={lastName => setLastName(lastName)}/>
          <CustomInput labelValue={'Latitude'} value={latitude} onChange={latitude => setLatitude(latitude)}/>
          <CustomInput labelValue={'Longitude'} value={longitude} onChange={longitude => setLongitude(longitude)}/>
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
  container: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    backgroundColor: '#f5f5f1'
  },
  avatarContainer: {
    marginTop: heightPercentageToDP('1'),
    alignSelf: 'center',
  },
  editButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP('10.7'),
    height: widthPercentageToDP('10.7'),
    bottom: 0,
    right: -widthPercentageToDP('2.4'),
    backgroundColor: PURPLE,
    borderRadius: widthPercentageToDP('10.7')/2
  },
  inputsContainer: {
    marginTop: heightPercentageToDP('2'),
    paddingHorizontal: widthPercentageToDP('2'),
  }
});
