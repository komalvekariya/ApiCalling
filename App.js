import React from 'react';
import { FlatList, StyleSheet, PixelRatio, TouchableOpacity, ActivityIndicator, Text, View, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import  AppNavigator from './navigator'

export default class App extends React.Component {

   render() {
          return(
            <AppNavigator/>
          )
      }
}
