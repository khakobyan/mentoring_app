import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function CustomButton({ buttonTitle, buttonTextStyle, buttonStyle, ...rest }) {
  return (
    <TouchableOpacity style={buttonStyle} {...rest}>
      <Text style={buttonTextStyle}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}
