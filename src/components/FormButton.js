import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { PURPLE, WHITE } from '../utils/colors';
import { heightPercentageToDP, widthPercentageToDP } from '../utils/sizes';

export default function FormButton({ buttonTitle, buttonContainerStyle, ...rest }) {
  return (
    <TouchableOpacity style={{...styles.buttonContainer, ...buttonContainerStyle}} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: widthPercentageToDP('100') / 2,
    height: heightPercentageToDP('100') / 15,
    backgroundColor: PURPLE,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 28,
    color: WHITE
  }
});