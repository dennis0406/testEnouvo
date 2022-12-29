import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ApprovalItem = ({dataItem}) => {
  const [nameIcon, setNameIcon] = useState('chevron-down');
  return (
    <View style={styles.container}>
      <View style={styles.approvalItem} >
        <Text ellipsizeMode="tail">{approvalName}</Text>
        <View style={styles.verticalLine}></View>
        <Text>{feature}</Text>
        <TouchableOpacity onPress={loadData}>
          <Icon name={nameIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.ItemContent} >
        <View style={styles.attribute} >
          <Text>Range Limit of Approval</Text>
          <View>
            <View>
              <Text style={styles.rangeContentLabel}>Minimum IDR</Text>
              <Text style={styles.rangeContentValue}>{dataItem.minimum}</Text>
            </View>
            <View>
              <Text style={styles.rangeContentLabel}>Maximum IDR</Text>
              <Text style={styles.rangeContentValue}>{dataItem.maximum}</Text>
            </View>
          </View>
        </View>
        <View style={styles.attribute} >
          <Text>Number of Approval</Text>
          <Text>{dataItem.quantity}</Text>
        </View>
        <View style={styles.attribute} >
          <Text>Approver 1</Text>
        </View>
      </View>
    </View>
  );
};

export default ApprovalItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
