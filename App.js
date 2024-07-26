import React from 'react';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';
import SignIn from './Screens/SignIn';
import SignUp from "./Screens/SignUp";
import Splash from "./Screens/Splash";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserContextProvider from "./Store/store";
import Home from "./Screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Colors} from "./assets/colors/colors";
import Reminders from "./Screens/Reminders";
import Workouts from "./Screens/Workouts";
import Profile from "./Screens/Profile";

export default function App() {
  const [fontsLoaded] = useFonts({
    'roboto_black': require('./assets/fonts/Roboto-Black.ttf'),
    'roboto_black_italic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
    'roboto_bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto_bold_italic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'roboto_italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'roboto_light': require('./assets/fonts/Roboto-Light.ttf'),
    'roboto_light_italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
    'roboto_medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto_medium_italic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'roboto_regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto_thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'roboto_thin_italic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
  });

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  if (!fontsLoaded) {
    return <Splash />;
  }

  function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={
          {animationEnabled: true, headerShown: false,  tabBarStyle: { backgroundColor: Colors.ButtonColor }}}>

          <Tab.Screen
              name="Home"
              component={Home}
              options={{
                  tabBarShowLabel: false,
                tabBarIcon: ({size, focused }) => (
                    <Image
                        source={require('./assets/icons/home-white.png')}
                        style={{width: focused ? 35 : size+5, height: focused ? 35 : size+5, tintColor: focused ? Colors.PrimaryColorFg : Colors.FilledCircleDark}}
                    />
                ),
              }}
          />
          <Tab.Screen
              name="Reminders"
              component={Reminders}
              options={{
                  tabBarShowLabel: false,
                tabBarIcon: ({size, focused }) => (
                    <Image
                        source={require('./assets/icons/reminder-white.png')}
                        style={{width: focused ? 30 : size, height: focused ? 30 : size, tintColor: focused ? Colors.PrimaryColorFg : Colors.FilledCircleDark}}
                    />
                ),
              }}
          />
            <Tab.Screen
                name="Workouts"
                component={Workouts}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ size, focused }) => (
                        <Image
                            source={require('./assets/icons/dumbell-white.png')}
                            style={{ width: focused ? 30 : size, height: focused ? 30 : size, tintColor: focused ? Colors.PrimaryColorFg : Colors.FilledCircleDark }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ size, focused }) => (
                        <Image
                            source={require('./assets/icons/account-white.png')}
                            style={{ width: focused ? 32 : size, height: focused ? 32 : size + 2, tintColor: focused ? Colors.PrimaryColorFg : Colors.FilledCircleDark }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
  }

  return (
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ animationEnabled: true, headerShown: false }}>
            <Stack.Screen name={"SignIn"} component={SignIn} />
            <Stack.Screen name={"SignUp"} component={SignUp} />
            <Stack.Screen name={"Main"} component={BottomTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
  );
}
