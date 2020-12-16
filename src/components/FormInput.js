import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../utils/sizes';
import { GREY } from '../utils/colors';

export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor={GREY}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: widthPercentageToDP('100') / 1.5,
    height: heightPercentageToDP('100') / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1
  }
});