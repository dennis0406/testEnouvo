import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/color';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Text style={styles.title}>Approval Matrix</Text>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.navigate('AddNew')}>
          <Button textBtn="Create New Approval" iconBtn="add-circle" />
        </TouchableOpacity>
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
    paddingHorizontal: 30,
    paddingVertical: 24,
  },
});
