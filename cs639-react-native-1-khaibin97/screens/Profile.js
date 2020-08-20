import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from "react-native";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: '',
      firstname: '',
      lastname: '',
      goalcalories: '',
      goalprotein: '',
      goalcarbo: '',
      goalfat: '',
      goalactivity: '',
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.logo}>A Fitness App</Text>
          <Text style={styles.header}>Profile: {this.state.username}</Text>

          <Text style={styles.header, {fontSize: 20, marginLeft: 20, marginTop: 10,}}>Name</Text>

          <TextInput placeholder="First Name"
            // placeholderTextColor='rgba(225,225,225,0.7)'
            style={styles.textInput}
            onChangeText={input => { this.setState({ firstname: input }) }}
          />

          <TextInput placeholder="Last Name"
            // placeholderTextColor='rgba(225,225,225,0.7)'
            style={styles.textInput}
            onChangeText={input => { this.setState({ lastname: input }) }}
          />

          <Text style={styles.header, {fontSize: 20, marginLeft: 20, marginTop: 10,}}>Daily Goals</Text>

          <TextInput placeholder="Calories"
            style={styles.textInput}
            onChangeText={input => { this.setState({ goalcalories: input }) }}
          />

          <TextInput placeholder="Protein"
            style={styles.textInput}
            onChangeText={input => { this.setState({ goalprotein: input }) }}
          />

          <TextInput placeholder="Carbohydrates"
            style={styles.textInput}
            onChangeText={input => { this.setState({ goalcarbo: input }) }}
          />

          <TextInput placeholder="Fat"
            style={styles.textInput}
            onChangeText={input => { this.setState({ goalfat: input }) }}
          />

          <TextInput placeholder="Activity"
            style={styles.textInput}
            onChangeText={input => { this.setState({ goalactivity: input }) }}
          />
          {console.log(this.state)}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener(this._keyboardDidHide);

    const { navigation } = this.props;
    this.setState({
      token: JSON.stringify(navigation.getParam('token', 'value')),
      username: JSON.stringify(navigation.getParam('username', 'value'))
    });

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(182,234,238,1)"
  },
  logo: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 40
  },
  header: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 30

  },
  textInput: {
    width: '80%',
    height: 43,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    alignSelf: "stretch",
    borderColor: "#000",
    fontSize: 16,
    lineHeight: 16,
    marginTop: 10,
    marginLeft: 20,
    paddingLeft: 10,
  }
});

export default Profile;
