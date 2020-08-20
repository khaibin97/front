import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from "react-native";
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';

import UsernameInput from '../components/UsernameInput';
import PasswordInput from '../components/PasswordInput';
import LogInButton from '../components/LogInButton';
import RegisterButton from '../components/RegisterButton';

import Dimensions from 'Dimensions';
// import { TextInput } from "react-native-gesture-handler";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
    }
  }

  setUsername(username) {
    this.setState({ username: username });
    // console.log(this.state.username)
  }
  setPassword(password) {
    this.setState({ password: password });
    // console.log(this.state.password)
  }

  _storeData = async () => {
    try {
      console.log("storing data")
      await AsyncStorage.setItem('username', this.state.username);
      await AsyncStorage.setItem('password', this.state.password);
      await AsyncStorage.setItem('token', this.state.token);
      console.log("stored data in asyncstorage")
      this.props.navigation.navigate("Tab")
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  handlelogin() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic "+ base64.encode(this.state.username + ":" + this.state.password));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch('https://mysqlcs639.cs.wisc.edu/login/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.message){
          Alert.alert(
            'Login failed',
            'Please try again',
            [{ text: 'Close' }],
            { cancelable: false },
          )
        }
        if(result.token){
          this.setState({token: result.token})
          console.log('Logged in')
          
          this._storeData();
          
        }
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.logo}>A Fitness App</Text>
          <Text style={styles.sublogo}>All you ever wanted</Text>
          <UsernameInput style={styles.userinput} function={(input) => { this.setUsername(input) }} />
          <PasswordInput style={styles.passwordinput} function={(input) => { this.setPassword(input) }} />
          <LogInButton style={styles.loginbutton} function={()=>{this.handlelogin()}}/>
          <Text style={styles.text2}>↓ New? Register here ↓</Text>
          <RegisterButton style={styles.registerbutton} function={() => this.props.navigation.navigate('Register')} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  _keyboardDidShow() {
    console.log('keyboard shown')
  }

  _keyboardDidHide() {
    console.log('keyboard hidden')
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////For Programmer to find stylesheet in VS CODE ////////////////////////////////////////
//////////////////////////////////Give Thickness to find it in Code Overview////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(182,234,238,1)"
  },
  logo: {
    marginTop: HEIGHT * 0.25,
    marginLeft: WIDTH * 0.1,
    fontSize: 20
  },
  sublogo: {
    marginLeft: WIDTH * 0.15
  },
  userinput: {
    width: WIDTH * 0.8,
    height: 43,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    marginTop: 85,
    marginLeft: 46
  },
  passwordinput: {
    width: WIDTH * 0.8,
    height: 43,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    marginTop: 5,
    marginLeft: 46
  },
  loginbutton: {
    width: 100,
    height: 36,
    marginTop: 35,
    alignSelf: "center"
  },
  text2: {
    color: "#121212",
    marginTop: 83,
    alignSelf: 'center'
  },
  registerbutton: {
    width: 100,
    height: 36,
    marginTop: 10,
    alignSelf: 'center'
  },

})