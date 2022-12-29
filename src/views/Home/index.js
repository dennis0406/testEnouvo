import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../constants/color';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {deleteData, useGetData, useGetFeature} from '../../helper/api';
import {APPROVAL} from '../../constants/api';
import ApprovalItem from './components/ApprovalItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const dataFeature = useGetFeature();
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    axios.get(`${APPROVAL}/`).then(res => setData(res.data));
  }, [isDelete]);

  const handleDelete = async id => {
    await axios.delete(`${APPROVAL}/${id}`);
    setIsDelete(!isDelete);
    ToastAndroid.show('Deleted successfully !', ToastAndroid.LONG);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Text style={styles.title}>Approval Matrix</Text>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.navigate('AddNew')}>
          <Button textBtn="Create New Approval" iconBtn="add-circle" />
        </TouchableOpacity>
        <SwipeListView
          data={data}
          renderItem={({item}) => (
            <ApprovalItem dataItem={item} dataFeatures={dataFeature} />
          )}
          keyExtractor={item => item.id}
          style={styles.flatlist}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.btn, styles.btnUpdate]}
                onPress={() => {
                  rowMap[data.item.id].closeRow();
                }}>
                <IconAntDesign name="edit" size={30} color={COLORS.white} />
              </TouchableOpacity>
              <View style={styles.sharp}></View>
              <TouchableOpacity
                style={[styles.btn, styles.btnClose]}
                onPress={() => {
                  rowMap[data.item.id].closeRow();
                }}>
                <Icon name="close-circle" size={30} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnDelete]}
                onPress={() => {
                  handleDelete(data.item.id);
                }}>
                <Icon name="trash" size={30} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-150}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.white,
  },
  main: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    width: Dimensions.get('window').width,
    height: '90%',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  flatlist: {
    width: '100%',
    marginTop: 30,
  },
  blackText: {
    color: COLORS.black,
  },
  btn: {
    paddingVertical: 23,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBack: {
    backgroundColor: COLORS.grey,
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%',
  },
  btnClose: {
    backgroundColor: COLORS.secondary,
    width: '23%',
  },
  btnDelete: {
    backgroundColor: COLORS.red,
    width: '23%',
  },
  btnUpdate: {
    backgroundColor: COLORS.primary,
    width: '55%',
    alignItems: 'flex-start',
  },
});
