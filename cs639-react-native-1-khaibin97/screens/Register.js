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
      firstname: '',
      lastname: ''
    }
  }
  handleRegister() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstName,
        lastname: this.state.lastName
      }),
      redirect: 'follow'
    };

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
          <TextInput placeholder="Firstname" style={styles.name} onChangeText={input => this.setState({ firstname: input })} />
          <TextInput placeholder="Lastname" style={styles.name} onChangeText={input => this.setState({ lastname: input })} />
          <RegisterButton style={styles.register} function={() => this.handleRegister()} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener(this._keyboardDidHide);
  }
}

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
  }
});

