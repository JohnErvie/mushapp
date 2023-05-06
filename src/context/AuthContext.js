import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  var [temperatureVal, setTemperatureVal] = useState([0]);
  var [co2Val, setCo2Val] = useState([0]);
  var [humidityVal, setHumidityVal] = useState([0]);

  return (
    <AuthContext.Provider
      value={{
        temperatureVal,
        co2Val,
        humidityVal,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
