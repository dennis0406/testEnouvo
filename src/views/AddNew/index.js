import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../components/Title';
import Form from '../../components/Form';

const AddNew = ({navigation}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Title title="Create New Approval Matrix" />
      <Form route="Create" />
    </ScrollView>
  );
};

export default AddNew;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
});
