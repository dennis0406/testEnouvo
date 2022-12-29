import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/color';

const ErrorMessage = ({message}) => {
  return (
    <View>
      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorMessage: {
    color: COLORS.red,
    fontSize: 13,
    paddingTop: 5,
    fontWeight: '500',
  },
});
