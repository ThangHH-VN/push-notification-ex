import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import ContactScreen from './src/screens/ContactScreen';
import HomeScreen from './src/screens/HomeScreen';
import { navigationRef } from './src/navigation/RootNavigation';
import useNotifications from './src/hook/useNotifications';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  )
}

const ContactStack = createNativeStackNavigator();
export const ContactStackScreen = () => {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen name="ContactScreen" component={ContactScreen} />
    </ContactStack.Navigator>
  )
}

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => alert(token));
  }, [])
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
        <Tab.Screen name="ContactStackScreen" component={ContactStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}