import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from "react-native";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import RegisterButton from "../components/RegisterButton";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }
  handleRegister() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(this.state)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      }),
      redirect: 'follow'
    };
    // console.log(this.state)

    fetch('https://mysqlcs639.cs.wisc.edu/users/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.message)
        if (result.message === "User created!") {
          Alert.alert(
            'Success!',
            'user successfully created',
            [{ text: 'Close', onPress: () => {this.props.navigation.navigate('Login')} }],
            { cancelable: false },
          )
        } else if (result.message) {
          Alert.alert(
            'Hmmm...',
            result.message,
            [{ text: 'Close' }],
            { cancelable: false },
          )
        }
      })
      .catch(error => {
        console.log("error")
        console.log('error', error)
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.registeringNewUser}>Registering new user...</Text>
          <Text style={styles.pleaseEnterYourInfo}>Please Enter your Info</Text>
          <UsernameInput style={styles.userinput} function={(input) => { this.setState({ username: input }) }} />
          <PasswordInput style={styles.passwordinput} function={(input) => { this.setState({ password: input }) }} />
          <TextInput placeholder="Firstname" style={styles.name} onChangeText={input => this.setState({ firstName: input })} />
          <TextInput placeholder="Lastname" style={styles.name} onChangeText={input => this.setState({ lastName: input })} />
          <RegisterButton style={styles.register} function={() => this.handleRegister()} />
          <Text style={styles.link} onPress={()=>this.props.navigation.navigate('Login')}>{'<-Back to Login'}</Text>
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
//////////////////////////////////Give Thickness to find it in COde Overview////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(182,234,238,1)"
  },
  registeringNewUser: {
    color: "#121212",
    fontSize: 20,
    marginTop: 116,
    marginLeft: 49
  },
  pleaseEnterYourInfo: {
    color: "#121212",
    marginTop: 65,
    marginLeft: 53
  },
  userinput: {
    width: '80%',
    height: 43,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    marginTop: 55,
    marginLeft: 46
  },
  passwordinput: {
    width: '80%',
    height: 43,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    marginTop: 15,
    marginLeft: 46
  },
  name: {
    width: '80%',
    height: 43,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    overflow: "scroll",
    marginTop: 15,
    marginLeft: 46,
    alignSelf: "stretch",
    paddingLeft: 16,
    paddingRight: 5,
    borderColor: "#000",
    fontSize: 16,
    lineHeight: 16
  },
  register: {
    width: 100,
    height: 36,
    marginTop: 29,
    marginLeft: 144
  },
  link: {
    alignSelf: "center",
    margin: 20,
    color: 'blue',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
  }
});

