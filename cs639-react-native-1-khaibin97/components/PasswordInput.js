import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class PasswordInput extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Icon name="lock-open" style={styles.iconStyle} />
        <TextInput
          placeholder="Password"
          editable={true}
          secureTextEntry={true}
          autoCompleteType = 'password'
          onChangeText = {input=>{this.props.function(input)}}
          style={styles.inputStyle}
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
  inputStyle: {
    width: '80%',
    color: "#000",
    alignSelf: "stretch",
    paddingLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    lineHeight: 16
  }
});
