import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  var [temperatureVal, setTemperatureVal] = useState([0]);
  var [co2Val, setCo2Val] = useState([0]);
  var [humidityVal, setHumidityVal] = useState([0]);

  const getParameter = () => {
    //console.log(date);

    var InsertAPIURL = `${BASE_URL}/parameter.php`;

    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        //alert(response[0].power_consumption);
        //console.log(response[0].Temperature);
        temperatureVal = response[0].Temperature;
        setTemperatureVal(temperatureVal);

        co2Val = response[0].cotwo;
        setCo2Val(co2Val);

        humidityVal = response[0].humidity;
        setHumidityVal(humidityVal);

        //console.log('running?');
        //return anomalyData;
      })
      .catch(error => {
        console.log(`getting data error ${error}`);
      });
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        temperatureVal,
        co2Val,
        humidityVal,

        getParameter,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
