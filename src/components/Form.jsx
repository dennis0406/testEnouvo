import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from './Button';
import axios from 'axios';
import {APPROVAL, FEATURE} from '../constants/api';
import {useGetApprover, useGetFeature} from '../helper/api';
import FeatureList from './FeatureList';
import ApproverList from './ApproverList';
import ErrorMessage from './ErrorMessage';
import ApproverInput from './ApproverInput';
import {useNavigation} from '@react-navigation/native';

const Form = ({route, idItem}) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState('');
  const refRBSheet = useRef();
  const [feature, setFeature] = useState('');
  const [refArr, setRefArr] = useState([]);
  const [approverArr, setapproverArr] = useState([]);
  const [dataItem, setDataItem] = useState({});

  useEffect(() => {
    if (idItem !== undefined) {
      axios.get(`${APPROVAL}/${idItem}`).then(res => {
        setDataItem(res.data);
        setParams({name: res.data.name, feature: res.data.feature});
        setQuantity(res.data.approvers.length);
        setapproverArr(res.data.approvers);
        setRange(res.data.range);
      });
    }
  }, [idItem]);

  console.log('approverArr', approverArr);

  const [errMessage, setErrMessage] = useState({
    name: '',
    feature: '',
    minimum: '',
    maximum: '',
    quantity: '',
  });

  const [range, setRange] = useState({
    minimum: 0,
    maximum: 0,
  });

  const [params, setParams] = useState({
    name: '',
    feature: '',
  });

  const handeChange = (name, value) => {
    setParams({...params, [name]: value});
  };

  const handeChangeRange = (name, value) => {
    setRange({...range, [name]: value});
  };

  const dataApprover = useGetApprover();
  useEffect(() => {
    if (feature !== '') {
      axios
        .get(`${FEATURE}/${feature}`)
        .then(res => handeChange('feature', res.data.name));
      console.log('isFetching');
    }
  }, [feature]);

  const handleChangeApproverArr = (approverArr, refBTS) => {
    refBTS.current.approverArray = approverArr;
    if (!refArr.includes(refBTS) && refArr.length !== 0) {
      setRefArr([...refArr, refBTS]);
      const result = refArr.map(ref => ref.current.approverArray);
      console.log('result',result);
    }
  };

  const resetData = () => {
    setParams({
      name: '',
      feature: '',
    });
    setRange({
      minimum: 0,
      maximum: 0,
    });
    setapproverArr([]);
    setQuantity('');
    setRefArr([]);
    setErrMessage({
      name: '',
      feature: '',
      minimum: '',
      maximum: '',
      quantity: '',
    });
  };

  const validateData = paramsObj => {
    let check = true;
    if (paramsObj.name == '') {
      check = false;
      setErrMessage({...errMessage, ['name']: 'Required input'});
    }

    return check;
  };

  const createApproval = () => {
    const paramsObj = {
      name: params.name,
      feature: params.feature,
      range: {
        minimum: range.minimum,
        maximum: range.maximum,
      },
      approvers: approverArr,
    };

    const check = validateData(paramsObj);
    if (!check) {
      return; //Not create
    }

    axios
      .post(APPROVAL, paramsObj)
      .then(() => {
        resetData();
        ToastAndroid.show('Created successfully !', ToastAndroid.LONG);
        navigation.navigate('Home');
      })
      .catch(e => console.log(e));
  };

  const updateApproval = () => {
    const paramsObj = {
      name: params.name,
      feature: params.feature,
      range: {
        minimum: range.minimum,
        maximum: range.maximum,
      },
      approvers: approverArr,
    };

    const check = validateData(paramsObj);
    if (!check) {
      return; //Not create
    }

    axios
      .put(`${APPROVAL}/${idItem}`, paramsObj)
      .then(() => {
        resetData();
        ToastAndroid.show('Updated successfully !', ToastAndroid.LONG);
        navigation.navigate('Home');
      })
      .catch(e => console.log(e));
  };

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
        <ErrorMessage message={errMessage.name} />
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
        <ErrorMessage message={errMessage.feature} />
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
            value={range.minimum.toString()}
            onChangeText={text => handeChangeRange('minimum', text)}
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
          />
        </View>
        <ErrorMessage message={errMessage.minimum} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Range of Approval (Maximum)</Text>
        <View style={styles.wrapperInput}>
          <Text style={styles.textInputIDR}>IDR</Text>
          <TextInput
            style={styles.input}
            placeholder="Input maximum"
            value={range.maximum.toString()}
            onChangeText={text => handeChangeRange('maximum', text)}
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
          />
        </View>
        <ErrorMessage message={errMessage.maximum} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Approval</Text>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            placeholder="Input number"
            onChangeText={text => {
              setQuantity(text);
            }}
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
            value={quantity.toString()}
          />
        </View>
        <ErrorMessage message={errMessage.quantity} />
      </View>

      {/* Approvers */}
      <View style={styles.approver}>
        {parseInt(quantity) > 0
          ? [...Array(parseInt(quantity))].map((qty, index) => (
              <ApproverInput
                key={index}
                index={index}
                data={dataApprover.data}
                handleChange={handleChangeApproverArr}
              />
            ))
          : null}
      </View>

      <TouchableOpacity
        onPress={route == 'Create' ? createApproval : updateApproval}
        style={styles.btn}>
        <Button textBtn={route == 'Create' ? 'ADD TO LIST' : 'UPDATE'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={resetData} style={styles.btn}>
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
