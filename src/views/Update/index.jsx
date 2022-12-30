import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../components/Title';
import Form from '../../components/Form';

const Update = ({route, navigation}) => {
  const {idItem} =route.params;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Title title="Update Approval Matrix" />
      <Form route="Update" idItem={idItem}/>
    </ScrollView>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
});
