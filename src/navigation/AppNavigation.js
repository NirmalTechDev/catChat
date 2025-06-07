import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../sreens/authentictions/signIn';
import FirstScreen from '../sreens/firstScreen';
import ProfileScreen from '../sreens/profile';
import TabNavigation from './TabNavigation';
import SettingScreen from '../sreens/profile/settings';
import ProfileEditScreen from '../sreens/profile/component/ProfileEditScreen';
import FriendsProfileScreen from '../sreens/friendsProfile';
import FindFriendsScreen from '../sreens/findFriends';
import VibesScreen from '../sreens/vibes';
import NotificationScreen from '../sreens/notification';
import ChatScreen from '../sreens/chat';
import ChatingScreen from '../sreens/chat/chating';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    // <ToastProvider>
    //   <NavigationContainer>
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="first" component={FirstScreen} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name="login" component={SignIn} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name='findFriend' component={FindFriendsScreen} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name='vibes' component={VibesScreen} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name='chat' component={ChatScreen} options={{ headerShown: false, animation: 'ios' }} />
      <Stack.Screen name='chatingScreen' component={ChatingScreen} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name='notifiications' component={NotificationScreen} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, animation: 'ios' }} />
      <Stack.Screen name='editProfile' component={ProfileEditScreen} options={{ headerShown: false, animation: 'ios' }} />
      <Stack.Screen name="setting" component={SettingScreen} options={{ headerShown: false, animation: 'ios' }} />

      <Stack.Screen name='friendsProfile' component={FriendsProfileScreen} options={{ headerShown: false, animation: 'ios' }} />
    </Stack.Navigator>
    //   </NavigationContainer>
    // </ToastProvider>
  );
};

export default AppNavigation;
