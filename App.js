import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {ToastProvider} from 'react-native-toast-notifications';

import {LogBox} from 'react-native';

import {Feather, Entypo, AntDesign} from '@expo/vector-icons';

const App = () => {
  return (
    <ToastProvider
      placement="bottom | top"
      duration={5000}
      animationType="slide-in | zoom-in"
      animationDuration={250}
      successColor="gray"
      dangerColor="gray"
      warningColor="gray"
      normalColor="gray"
      //icon={<Feather name="wifi-off" size={24} color="black" />}
      //successIcon={<AntDesign name="checkcircle" size={24} color="black" />}
      //warningIcon={<Entypo name="warning" size={24} color="black" />}
      textStyle={{fontSize: 16}}
      offset={50} // offset for both top and bottom toasts
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}>
      <AuthProvider>
        <StatusBar backgroundColor="#06bcee" />

        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
