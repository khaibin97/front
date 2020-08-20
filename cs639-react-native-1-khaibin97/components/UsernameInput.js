import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class UsernameInput extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Icon name="account" style={styles.iconStyle} />
        <TextInput placeholder="Username" 
          style={styles.textInput}
          autoCompleteType = 'username'
          onChangeText = {input=>{this.props.function(input)}}
           />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 16
  },
  textInput: {
    width: '80%',
    alignSelf: "stretch",
    paddingLeft: 16,
    paddingRight: 5,
    borderColor: "#000",
    fontSize: 16,
    lineHeight: 16
  }
});
