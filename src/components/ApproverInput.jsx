import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import ApproverList from './ApproverList';
import ErrorMessage from './ErrorMessage';
import {COLORS} from '../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useGetApprover} from '../helper/api';

const ApproverInput = ({index, handleChange, data}) => {
  const [approver, setApprover] = useState([]);
  const refRBSS = useRef();
  const [text, setText] = useState([]);
  console.log(approver);

  

  useEffect(() => {
    if (data.length !== 0) {
      const filted = data.filter(item => approver.includes(item.id));
      const result = filted.map(item => item.name);
      setText(result);
      handleChange(approver, refRBSS);
    }
  }, [approver]);

  return (
    <View style={styles.inputContainer}>
      <RBSheet
        ref={refRBSS}
        closeOnPressMask={false}
        animationType="slide"
        minClosingHeight={20}
        customStyles={{
          container: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 650,
            borderTopLeftRadius: 23,
            borderTopRightRadius: 23,
          },
        }}>
        <ApproverList
          refRBS={refRBSS}
          setApprover={setApprover}
          approver={approver}
          data={data}
        />
      </RBSheet>

      <Text style={styles.label}>Approver (Sequence {index + 1})</Text>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Select Feature"
          placeholderTextColor={COLORS.grey}
          editable={false}
          value={text.join(', ')}
        />
        <TouchableOpacity
          onPress={() => {
            refRBSS.current.open();
          }}>
          <Icon name="chevron-down" style={styles.iconInput} />
        </TouchableOpacity>
      </View>
      <ErrorMessage />
    </View>
  );
};

export default ApproverInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: COLORS.black,
    marginBottom: 8,
    fontSize: 18,
  },
  wrapperInput: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.grey,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: COLORS.black,
    paddingLeft: 20,
    paddingRight: 50,
    width: '100%',
  },
  iconInput: {
    color: COLORS.grey,
    fontSize: 30,
    marginLeft: -40,
    marginTop: 7,
  },
  textInputIDR: {
    color: COLORS.black,
    marginLeft: 20,
  },
  errorMessage: {
    color: COLORS.red,
    fontSize: 13,
    paddingTop: 5,
  },
  btn: {marginBottom: 20},
});
