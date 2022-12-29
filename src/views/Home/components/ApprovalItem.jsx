import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/color';
import axios from 'axios';
import {FEATURE} from '../../../constants/api';
import {useGetFeature} from '../../../helper/api';

const ApprovalItem = ({dataItem, dataFeatures}) => {
  const [isPress, setIsPress] = useState(false);
  const nameIcon = isPress ? 'chevron-up' : 'chevron-down';
  const borderColor = isPress ? COLORS.primary : COLORS.grey;

  const FEATUREARR = dataItem.approvers;
  let approverText = [];

  return (
    <Pressable style={styles.approvalItem}>
      <View style={[styles.itemVisible, {borderColor: borderColor}]}>
        <Text
          style={[
            styles.textVissible,
            styles.nameApr,
            {
              borderColor: borderColor,
              color: isPress ? COLORS.primary : COLORS.black,
            },
          ]}
          ellipsizeMode="tail">
          {dataItem.name}
        </Text>
        <View style={styles.rightVisible}>
          <Text
            style={[
              styles.textVissible,
              {color: isPress ? COLORS.primary : COLORS.black},
            ]}>
            {dataItem.feature}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsPress(!isPress);
            }}>
            <Icon name={nameIcon} style={styles.icon} color={borderColor} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.ItemContent,
          isPress ? styles.itemContentShown : styles.itemContentHidden,
        ]}>
        <View style={styles.attribute}>
          <Text style={styles.attributeText}>Range Limit of Approval</Text>
          <View>
            <View style={styles.rangeRight}>
              <Text style={styles.rangeContentLabel}>Minimum IDR</Text>
              <Text style={styles.rangeContentValue}>
                {dataItem.range.minimum}
              </Text>
            </View>
            <View style={styles.rangeRight}>
              <Text style={styles.rangeContentLabel}>Maximum IDR</Text>
              <Text style={styles.rangeContentValue}>
                {dataItem.range.maximum}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.attribute}>
          <Text style={styles.attributeText}>Number of Approval</Text>
          <Text style={styles.rangeContentLabel}>
            {dataItem.approvers.length}
          </Text>
        </View>
        {[...Array(dataItem.approvers.length)].map((approver, index) => (
          <View style={styles.attribute} key={index}>
            {FEATUREARR.forEach(item => {
              let arrText = [];
              item.forEach(subItem => {
                
                if(dataFeatures.data.filter(
                    featureItem => featureItem.id == subItem,
                  )[0] !==undefined){
                  arrText.push(dataFeatures.data.filter(
                    featureItem => featureItem.id == subItem,
                  )[0].name)
                }
              });
              approverText.push(arrText.join(', '))

            })}
            <Text style={styles.attributeText}>Approver {index + 1}</Text>
            <Text style={styles.rangeContentLabel}>{approverText[index]}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  approvalItem: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
  },
  itemVisible: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    paddingVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  textVissible: {
    fontWeight: '400',
    fontSize: 16,
  },

  nameApr: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: COLORS.grey,
    paddingVertical: 19,
  },
  icon: {
    fontSize: 24,
    padding: 6,
  },
  rightVisible: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    paddingLeft: 20,
    paddingVertical: 10,
  },
  ItemContent: {
    borderRadius: 15,
    marginTop: 10,
    borderColor: COLORS.grey,
  },
  itemContentShown: {
    borderWidth: 1,
  },
  itemContentHidden: {
    borderWidth: 0,
    height: 0,
  },
  attributeText: {
    color: COLORS.black,
    fontSize: 13,
  },
  rangeContentLabel: {
    color: COLORS.secondary,
  },
  rangeContentValue: {
    color: COLORS.secondary,
    fontWeight: '700',
    paddingLeft: 20,
  },
  attribute: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  rangeRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ApprovalItem;
