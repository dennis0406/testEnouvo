import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './src/views/Home';
import AddNew from './src/views/AddNew';
import Update from './src/views/Update';
import {COLORS} from './src/constants/color';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation}) => {
          return {
            headerTitleAlign: 'center',
            animation: 'slide_from_bottom',
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon
                    name="arrow-back-circle"
                    color={COLORS.white}
                    size={34}
                  />
                </TouchableOpacity>
              );
            },
          };
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNew"
          component={AddNew}
          options={{
            headerShown: true,
            title: 'Approval Matrix',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: COLORS.white,
            },
            headerBackTitleStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
