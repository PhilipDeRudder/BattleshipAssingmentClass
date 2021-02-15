import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import styles from './style/style'

export default class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <Header></Header>
        <Gameboard></Gameboard>
        <Footer></Footer>
      </View>
    )
  }
}
