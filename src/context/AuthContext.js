import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL, LOCAL_BASE_URL} from '../config';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  var [temperatureVal, setTemperatureVal] = useState([0]);
  var [co2Val, setCo2Val] = useState([0]);
  var [humidityVal, setHumidityVal] = useState([0]);

  var [id, setId] = useState([0]);
  var [savedId, setSavedId] = useState([0]);

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
        id = response[0].ID;
        setId(id);

        temperatureVal = response[0].Temperature;
        setTemperatureVal(temperatureVal);

        co2Val = response[0].cotwo;
        setCo2Val(co2Val);

        humidityVal = response[0].humidity;
        setHumidityVal(humidityVal);

        connection = 'Connected';
        setConnection(connection);

        status = 'Running';
        setStatus(status);

        if (id === savedId) {
          temperatureVal = 'N/A';
          setTemperatureVal(temperatureVal);

          co2Val = 'N/A';
          setCo2Val(co2Val);

          humidityVal = 'N/A';
          setHumidityVal(humidityVal);

          status = 'Not Running';
          setStatus(status);
        }

        savedId = id;
        setSavedId(savedId);

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

            id = response[0].ID;
            setId(id);

            temperatureVal = response[0].Temperature;
            setTemperatureVal(temperatureVal);

            co2Val = response[0].cotwo;
            setCo2Val(co2Val);

            humidityVal = response[0].humidity;
            setHumidityVal(humidityVal);

            connection = 'Connected';
            setConnection(connection);

            status = 'Running';
            setStatus(status);

            if (id === savedId) {
              temperatureVal = 'N/A';
              setTemperatureVal(temperatureVal);

              co2Val = 'N/A';
              setCo2Val(co2Val);

              humidityVal = 'N/A';
              setHumidityVal(humidityVal);

              status = 'Not Running';
              setStatus(status);
            }

            savedId = id;
            setSavedId(savedId);

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
