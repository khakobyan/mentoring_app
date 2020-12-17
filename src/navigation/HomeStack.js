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
import CreateGroupScreen from '../views/groups/create';
import MemberScreen from '../views/member';
import GroupScreen from '../views/groups/group';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const GroupsStack = createStackNavigator();
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
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="home" size={widthPercentageToDP('6')} />
          ),
        }}
      >
        { () => (
        <HomeStack.Navigator screenOptions={{animationEnabled: false}}>
          <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="CreateGroup"
            component={CreateGroupScreen}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Member"
            component={MemberScreen}
            options={{headerShown: false}}
          />
        </HomeStack.Navigator>
      )}
      </Tab.Screen>
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
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({color}) => (
            <Icon color={color} name="account-group" size={widthPercentageToDP('6')} />
          ),
        }}
      >
        { () => (
          <GroupsStack.Navigator screenOptions={{animationEnabled: false}}>
            <GroupsStack.Screen
              name="Groups"
              component={GroupsScreen}
              options={{headerShown: false}}
            />
            <GroupsStack.Screen
              name="Group"
              component={GroupScreen}
              options={{headerShown: false}}
            />
          </GroupsStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{header: () => null}}  name='Home' component={Home} />
    </Stack.Navigator>
  );
}
