import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/color';

const Button = ({primary = true, textBtn, iconBtn}) => {

  return (
    <View style={[primary ? styles.primaryBg : styles.secondaryBg, styles.btnContainer]}>
      {iconBtn ? <Icon name={iconBtn} style={styles.iconBtn} /> : null}
      <Text style={[primary ? styles.primaryText : styles.secondaryText, styles.textBtn]}>{textBtn}</Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontWeight: '700',
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.secondary,
  },
  primaryBg: {
    backgroundColor: COLORS.secondary,
  },
  secondaryBg: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  iconBtn: {
    fontSize: 20,
    color: COLORS.white,
    marginRight: 10,
  }
});
