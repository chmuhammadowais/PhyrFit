import React from 'react';
import { useFonts } from 'expo-font';
import SignIn from './Screens/SignIn';
import SignUp from "./Screens/SignUp";
import Splash from "./Screens/Splash";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import UserContextProvider from "./Store/store"
import Home from "./Screens/Home";

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
  if (!fontsLoaded) {
    return <Splash />;
  }
  return(
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{animationEnabled: true, headerShown: false}}>
            <Stack.Screen name={"SignIn"} component={SignIn} />
            <Stack.Screen name={"SignUp"} component={SignUp} />
            <Stack.Screen name={"Home"} component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>

  )
}
