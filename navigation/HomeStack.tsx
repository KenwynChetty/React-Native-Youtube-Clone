import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {TabOneParamList} from '../types';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Auth } from 'aws-amplify'
const logo =  require('../assets/images/logo.png');

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function CustomHeader()  {
  const signOut = () =>{
    Auth.signOut();
  }
    return (
      <SafeAreaView style={{backgroundColor: '#141414', marginTop:StatusBar.currentHeight}}>
      <View
        style={{
          margin: 10,
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Image resizeMode="contain" style={{width:100, height: 25}} source={logo} />
  
          <View style={{flexDirection: 'row', width: 150,  justifyContent: 'space-between'}}>
            <Feather name="cast" size={28} color="white" />
            <AntDesign name="bells" size={28} color="white" />
            <AntDesign name="search1" size={28} color="white" />
            <TouchableOpacity onPress={signOut}>
            <FontAwesome name="user-circle-o" size={28} color="white" />
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
    );
  };

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{header: () => <CustomHeader />,}}>
      <HomeStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: 'YouTube' }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator