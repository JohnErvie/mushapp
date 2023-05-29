import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL, LOCAL_BASE_URL} from '../config';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  var [temperatureVal, setTemperatureVal] = useState([0]);
  var [co2Val, setCo2Val] = useState([0]);
  var [humidityVal, setHumidityVal] = useState([0]);

  var [savedtemperatureVal, savedsetTemperatureVal] = useState([0]);
  var [savedco2Val, savedsetCo2Val] = useState([0]);
  var [savedhumidityVal, savedsetHumidityVal] = useState([0]);

  var [savedtemperatureVal1, savedsetTemperatureVal1] = useState([0]);
  var [savedco2Val1, savedsetCo2Val1] = useState([0]);
  var [savedhumidityVal1, savedsetHumidityVal1] = useState([0]);

  var [connection, setConnection] = useState('');
  var [status, setStatus] = useState('');

  const getParameter = () => {
    //console.log(date);
    var InsertAPIURL = `${BASE_URL}/parameter.php`;

    var InsertAPIURLLocal = `${LOCAL_BASE_URL}/parameter.php`;

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
        //console.log(response);
        /*
        temperatureVal = response[0].Temperature;
        setTemperatureVal(temperatureVal);

        co2Val = response[0].cotwo;
        setCo2Val(co2Val);

        humidityVal = response[0].humidity;
        setHumidityVal(humidityVal);
        */
        temperatureVal = response[0].Temperature;
        setTemperatureVal(temperatureVal);

        co2Val = response[0].cotwo;
        setCo2Val(co2Val);

        humidityVal = response[0].humidity;
        setHumidityVal(humidityVal);

        savedtemperatureVal1 = temperatureVal;
        savedsetTemperatureVal1(savedtemperatureVal1);

        savedco2Val1 = co2Val;
        savedsetCo2Val1(savedco2Val1);

        savedhumidityVal1 = humidityVal;
        savedsetHumidityVal1(savedhumidityVal1);

        connection = 'Connected';
        setConnection(connection);

        status = 'Running';
        setStatus(status);

        if (
          savedtemperatureVal === savedtemperatureVal1 &&
          savedco2Val === savedco2Val1 &&
          savedhumidityVal === savedhumidityVal1
        ) {
          temperatureVal = 'N/A';
          setTemperatureVal(temperatureVal);

          co2Val = 'N/A';
          setCo2Val(co2Val);

          humidityVal = 'N/A';
          setHumidityVal(humidityVal);

          status = 'Not Running';
          setStatus(status);
        }

        //////
        savedtemperatureVal = savedtemperatureVal1;
        savedsetTemperatureVal(savedtemperatureVal);

        savedco2Val = savedco2Val1;
        savedsetCo2Val(savedco2Val);

        savedhumidityVal = savedhumidityVal1;
        savedsetHumidityVal(savedhumidityVal);

        //console.log(temperatureVal, savedtemperatureVal);

        //console.log('running?');
        //return anomalyData;
      })
      .catch(error => {
        console.log(`getting data error from cloudflare url ${error}`);

        fetch(InsertAPIURLLocal, {
          method: 'POST',
          headers: headers,
        })
          .then(response => response.json())
          .then(response => {
            //alert(response[0].power_consumption);
            //console.log(response);

            temperatureVal = response[0].Temperature;
            setTemperatureVal(temperatureVal);

            co2Val = response[0].cotwo;
            setCo2Val(co2Val);

            humidityVal = response[0].humidity;
            setHumidityVal(humidityVal);

            savedtemperatureVal1 = temperatureVal;
            savedsetTemperatureVal1(savedtemperatureVal1);

            savedco2Val1 = co2Val;
            savedsetCo2Val1(savedco2Val1);

            savedhumidityVal1 = humidityVal;
            savedsetHumidityVal1(savedhumidityVal1);

            connection = 'Connected';
            setConnection(connection);

            status = 'Running';
            setStatus(status);

            if (
              savedtemperatureVal === savedtemperatureVal1 &&
              savedco2Val === savedco2Val1 &&
              savedhumidityVal === savedhumidityVal1
            ) {
              temperatureVal = 'N/A';
              setTemperatureVal(temperatureVal);

              co2Val = 'N/A';
              setCo2Val(co2Val);

              humidityVal = 'N/A';
              setHumidityVal(humidityVal);

              status = 'Not Running';
              setStatus(status);
            }

            //////
            savedtemperatureVal = savedtemperatureVal1;
            savedsetTemperatureVal(savedtemperatureVal);

            savedco2Val = savedco2Val1;
            savedsetCo2Val(savedco2Val);

            savedhumidityVal = savedhumidityVal1;
            savedsetHumidityVal(savedhumidityVal);

            console.log(temperatureVal, savedtemperatureVal);

            //console.log('running?');
            //return anomalyData;
          })
          .catch(error => {
            temperatureVal = 'N/A';
            setTemperatureVal(temperatureVal);

            co2Val = 'N/A';
            setCo2Val(co2Val);

            humidityVal = 'N/A';
            setHumidityVal(humidityVal);
            console.log(`getting data error from local url ${error}`);

            connection = 'Not Connected';
            setConnection(connection);
          });
      });
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        temperatureVal,
        co2Val,
        humidityVal,
        connection,
        status,

        getParameter,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
