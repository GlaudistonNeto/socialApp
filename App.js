import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons 
              name='ios-home' size={24} color={tintColor} />
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons 
              name='ios-chatbubbles' size={24} color={tintColor} />
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons 
              name='ios-add-circle' size={48} color='#e97645'
              style={{
                shadowColor: '#e97645',
                shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, shadowOpacity: 0.3
              }}
            />
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons 
              name='ios-person' size={24} color={tintColor} />
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons 
              name='ios-notifications' size={24} color={tintColor} />
          }
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === 'Post') {
              navigation.navigate('postModal')
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          activeTintColor: '#be653a',
          inactiveTintColor: '#c5cf85',
          showLabel: false
        }
      },
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
);
