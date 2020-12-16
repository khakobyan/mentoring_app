import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../views/home';
import AccountScreen from '../views/account';
import { PURPLE } from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP } from '../utils/sizes';
import GroupsScreen from '../views/groups';
import JobInfoScreen from '../views/job';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <TopTab.Navigator tabBarOptions={{style: {paddingTop: widthPercentageToDP('8')}}}>
      <Tab.Screen
        name="Account"
        component={AccountScreen}
      />
      <Tab.Screen
        name="Job Info"
        component={JobInfoScreen}
      />
    </TopTab.Navigator>
  )
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: PURPLE}}
    >
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="home" size={widthPercentageToDP('6')} />
          ),
        }}
      />
      <Tab.Screen 
        name="TopTabs"
        component={TopTabs}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="account" size={widthPercentageToDP('6')} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="account-group" size={widthPercentageToDP('6')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{header: () => null}}  name='Home' component={Home} />
    </Stack.Navigator>
  );
}
