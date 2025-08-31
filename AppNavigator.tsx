import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Bottom Tab Screens
import HomeScreen from './src/healthCareUI/HomeScreen';
import ChatScreen from './src/healthCareUI/ChatScreen';
import PatientsScreen from './src/healthCareUI/PatientDetailScreen';
import FoldersScreen from './src/healthCareUI/FoldersScreen';

// Auth Screens
import SplashScreen from './src/healthCareUI/SplashScreen';
import LoginScreen from './src/healthCareUI/LoginScreen';
import CreateNewRegister from './src/healthCareUI/NewRegister';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
/**
 * AppNavigator
 *
 * Defines all navigation for the app:
 * - Root Stack Navigator (for auth flow and splash)
 * - Bottom Tab Navigator (for main app screens after login)
 */

// Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        height: 80,
        paddingBottom: 20,
        paddingTop: 10,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        backgroundColor: '#ffffff',
      },
      tabBarIcon: ({ focused }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Chats':
            iconName = focused ? 'chatbox' : 'chatbox-outline';
            break;
          case 'Patients':
            iconName = focused ? 'person-circle' : 'person-circle-outline';
            break;
          case 'Folders':
            iconName = focused ? 'folder' : 'folder-outline';
            break;
        }

        return (
          <Icon
            name={iconName}
            size={24}
            color={focused ? '#005eb8' : '#777'}
          />
        );
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
        // backgroundColor: 'white',
        // color: 'white',
      },
      tabBarActiveTintColor: '#005eb8',
      tabBarInactiveTintColor: '#777',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Chats" component={ChatScreen} />
    <Tab.Screen name="Patients" component={PatientsScreen} />
    <Tab.Screen name="Folders" component={FoldersScreen} />
  </Tab.Navigator>
);

// Root Stack Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="NewRegister" component={CreateNewRegister} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
