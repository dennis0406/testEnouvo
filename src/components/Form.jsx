import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from './Button';
import axios from 'axios';
import {FEATURE} from '../constants/api';
import {useGetApprover, useGetFeature} from '../helper/api';
import FeatureList from './FeatureList';
import ApproverList from './ApproverList';
import ErrorMessage from './ErrorMessage';
import ApproverInput from './ApproverInput';

const Form = () => {
  const [quantity, setQuantity] = useState(0);
  const refRBSheet = useRef();
  const refRBSheetApprover = useRef();
  const [feature, setFeature] = useState('');
  const [featureName, setFeatureName] = useState('');
  const [approver, setApprover] = useState([]);
  const [approvalName, setApprovalName] = useState();
  const [params, setParams] = useState({
    name: '',
    feature: '',
    range: {},
    approvers: [],
  });

  const handeChange = (name, value) => {
    setParams({...params, [name]: value});
  };

  console.log(approver);
  const [range, setRange] = useState({
    minimum: 0,
    maximum: 0,
  });

  const handeChangeRange = (name, value) => {
    setRange({...range, [name]: value});
  };

  const dataFeature = useGetFeature();
  const dataApprover = useGetApprover();
  useEffect(() => {
    if (feature !== '') {
      axios
        .get(`${FEATURE}/${feature}`)
        .then(res => handeChange('feature', res.data.name));
    }
  }, [feature]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Approval Matrix Alias</Text>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            placeholder="Input Matrix name"
            onChangeText={text => handeChange('name', text)}
            placeholderTextColor={COLORS.grey}
            value={params.name}
          />
        </View>
        <ErrorMessage message="test" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Feature</Text>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            placeholder="Select Feature"
            value={params.feature}
            placeholderTextColor={COLORS.grey}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}>
            <Icon name="chevron-down" style={styles.iconInput} />
          </TouchableOpacity>
        </View>
        <ErrorMessage />
      </View>

      {/* feature lists */}
      <View>
        <RBSheet
          ref={refRBSheet}
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
          <FeatureList
            refRBS={refRBSheet}
            setFeature={setFeature}
            feature={feature}
          />
        </RBSheet>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Range of Approval (Minimum)</Text>
        <View style={styles.wrapperInput}>
          <Text style={styles.textInputIDR}>IDR</Text>
          <TextInput
            style={styles.input}
            placeholder="Input minimum"
            value={range.minimum}
            onChangeText={text => handeChangeRange('minimum', text)}
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
          />
        </View>
        <ErrorMessage />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Range of Approval (Maximum)</Text>
        <View style={styles.wrapperInput}>
          <Text style={styles.textInputIDR}>IDR</Text>
          <TextInput
            style={styles.input}
            placeholder="Input maximum"
            value={range.maximum}
            onChangeText={text => handeChangeRange('maximum', text)}
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
          />
        </View>
        <ErrorMessage />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Approval</Text>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            placeholder="Input number"
            onChangeText={text => {
              setQuantity(parseInt(text));
            }}
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
            value={quantity}
          />
        </View>
        <ErrorMessage />
      </View>

      {/* Approvers */}
      <View style={styles.approver}>
        {quantity > 0
          ? [...Array(quantity)].map((qty, index) => (
              <ApproverInput index={index} />
            ))
          : null}
      </View>
      {/* <View style={styles.inputContainer} key={index}>
                <Text style={styles.label}>
                  Approver (Sequence {index + 1})
                </Text>
                <View style={styles.wrapperInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Select Feature"
                    onChange={text => console.log(text.nativeEvent.text)}
                    placeholderTextColor={COLORS.grey}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheetApprover.current.open();
                    }}>
                    <Icon name="chevron-down" style={styles.iconInput} />
                  </TouchableOpacity>
                </View>
                <ErrorMessage />
              </View> */}

      {/* <View>
        <RBSheet
          ref={refRBSheetApprover}
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
            refRBS={refRBSheetApprover}
            setApprover={setApprover}
            approver={approver}
          />
        </RBSheet>
      </View> */}

      <TouchableOpacity onPress={() => {}} style={styles.btn}>
        <Button textBtn="ADD TO LIST" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.btn}>
        <Button textBtn="RESET" primary={false} />
      </TouchableOpacity>
    </View>
  );
};

export default Form;

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
