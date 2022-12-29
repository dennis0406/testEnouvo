import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/color';

const Title = ({title}) => {
  return (
    <View style={styles.containerTitle}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  containerTitle: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.primary,
  }
});
