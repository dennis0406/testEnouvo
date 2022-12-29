import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({label, placeholder, onChangeInput, value, iconInput}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChange={text => onChangeInput(text)}
          placeholderTextColor={COLORS.grey}
          value={value}
        />
        {iconInput ? <Icon name={iconInput} style={styles.iconInput} /> : null}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  label: {
    color: COLORS.black,
  },
  wrapperInput: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.grey,
    color: COLORS.black,
    paddingLeft: 20,
  },
  iconInput: {
    position: 'absolute',
    top: '50%',
    left: 20,
    transform: [
      {translateY: '-50%'},
    ]
  },
});
