import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native';
import {AuthContext} from '../context/AuthContext';

import {AntDesign, Entypo} from '@expo/vector-icons';

const HomeScreen = ({}) => {
  const {
    temperatureVal,
    co2Val,
    humidityVal,
    getParameter,
    connection,
    status,
  } = useContext(AuthContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let componentMounted = true;
      const fetchData = async () => {
        //you async action is here
        if (componentMounted) {
          getParameter();
        }
      };
      fetchData();
      return () => {
        componentMounted = false;
      };
    }, 3000); //refresh in 2 second

    return () => {
      clearInterval(intervalId);
    }; //This is important
  }, []);
  /*
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(0).then(() => {
      setRefreshing(false);

      //displayGraphRadio(radioValue[0]);
      getParameter();
    });
  }, []);
*/
  return (
    <>
      <View style={styles.center}>
        <Text style={styles.Text}> Temperature: {temperatureVal} °C</Text>
        <Text style={styles.Text}> CO2: {co2Val}</Text>
        <Text style={styles.Text}>
          {' '}
          Humidity: {humidityVal} {'\n\n'}
        </Text>
        <Text style={styles.Text}> Connection: {connection}</Text>
        <Text style={styles.Text}> Status: {status}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    //flex: 1,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'space-between',
    //alignItems: 'center',
  },
  centerText: {
    //flex: 1,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#5f72ed',
    borderWidth: 1,
  },
  Text: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
  },
});

export default HomeScreen;
