import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {FEATURE} from '../constants/api';
import CheckBox from '@react-native-community/checkbox';
import { useGetFeature } from '../helper/api';

const FeatureList = ({refRBS, setFeature, feature}) => {
  const [search, setSearch] = useState('');
  const [check, setCheck] = useState([feature]);

  const {data} = useGetFeature();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select feature</Text>
        <TouchableOpacity
          onPress={() => {
            setFeature(check[0]);
            refRBS.current.close();
          }}
          style={styles.closeBtn}>
          <Icon name="close-circle" size={32} color={COLORS.bgCloseBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('searching', search);
          }}>
          <Icon name="search" size={32} color={COLORS.secondary} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search keyword"
          style={styles.inputSearch}
          placeholderTextColor={COLORS.grey}
          value={search}
          onChange={text => {
            setSearch(text.nativeEvent.text);
          }}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.featureItem}>
            <Text style={styles.label}>{item.name}</Text>
            <CheckBox
              value={check.includes(item.id)}
              boxType="square"
              tintColors={{true: COLORS.secondary, false: COLORS.grey}}
              onChange={() => {
                if (!check.includes(item.id)) {
                  setCheck([item.id]);
                } else {
                  setCheck([]);
                }
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default FeatureList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 12,
    
  },
  label: {
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'capitalize',
    color: COLORS.black,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.grey,
    borderRadius: 8,
  },
  inputSearch: {
    width: '85%',
    paddingLeft: 20,
    color: COLORS.black,
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
});
