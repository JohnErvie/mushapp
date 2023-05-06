import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native';
import {AuthContext} from '../context/AuthContext';

import {AntDesign, Entypo} from '@expo/vector-icons';

const HomeScreen = ({}) => {
  const {temperatureVal, co2Val, humidityVal} = useContext(AuthContext);

  return (
    <View style={styles.center}>
      <Text style={styles.buttonText}> Temperature: {temperatureVal}</Text>
      <Text style={styles.buttonText}> CO2: {co2Val}</Text>
      <Text style={styles.buttonText}> Humidity: {humidityVal}</Text>
    </View>
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
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
  },
});

export default HomeScreen;
