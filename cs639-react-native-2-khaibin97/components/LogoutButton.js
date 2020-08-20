import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class LogoutButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress = {this.props.function}>
        <Text style={styles.caption}>Log Out</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    borderRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    width:60,
    height: 36,
  },
  caption: {
    color: "#fff",
    fontSize: 14,
  }
});
