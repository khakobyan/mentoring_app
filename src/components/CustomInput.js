import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../utils/sizes';
import { GREY } from '../utils/colors';
import FormInput from './FormInput';

export default function CustomInput({ labelValue, value, onChange, ...rest }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{labelValue}</Text>
      <FormInput
        value={value}
        placeholderText={labelValue}
        onChangeText={onChange}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: '#333333'
  },
});