import React from 'react';
import { useFonts } from 'expo-font';
import SignIn from './Screens/SignIn';
import Splash from "./Screens/Splash";

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

  if (!fontsLoaded) {
    return <Splash />;
  }

  return <SignIn />;
}
