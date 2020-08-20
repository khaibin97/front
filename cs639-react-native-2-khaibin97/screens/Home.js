import React, { Component } from "react";
import {
  StyleSheet, View, ScrollView,
  Text, TextInput,
  Keyboard, KeyboardAvoidingView,
  TouchableWithoutFeedback, TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

class Home extends React.Component {
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
      currentDate: new Date(),
      activities: [],
      meals: [],
      currCalories: 0,
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.logo}>A Fitness App</Text>
          <Text style={styles.subtitle}>Welcome, {this.state.firstname} {this.state.lastname}</Text>
          <Text style={styles.subtitle}>Today is {moment(this.state.currentDate).format("dddd, MMMM Do")}</Text>
          <Text style={styles.subtitle}>Calories intake/Goal Calories</Text>
          <View style={{ flex: 0, flexDirection: 'row', flexShrink: 1 }}>
            <Text style={[styles.logo, { flex: 5, textAlign: 'center', marginTop: 5 }]}>{this.state.currCalories} / {this.state.goalcalories}</Text>
            <Text style={{ flex: 2, textAlign: 'center', marginRight: 20, marginTop: 45 }}>cal.</Text>
          </View>

          <Text style={styles.subtitle}>Number of Activities done today</Text>
          <View style={{ flex: 0, flexDirection: 'row', flexShrink: 1 }}>
            <Text style={[styles.logo, { flex: 5, textAlign: 'center', marginTop: 5 }]}>{this.state.activities.length} / {this.state.goalactivity}</Text>
            <Text style={{ flex: 2, textAlign: 'center', marginRight: 20, marginTop: 45 }}>
              {this.state.goalactivity > 1 ? "sets" : "set"}
            </Text>
          </View>

          <View onStartShouldSetResponder={() => true}>
            <ScrollView style={{ margin: 10 }}>
              <View style={{margin:10, marginLeft: 20}}>
                <Text>Meals</Text>
                {/*render meals */}
                <TouchableOpacity style={styles.addButton} onPress={() => {

                }}>
                  <Icon name='plus' color='#383e47' size={30} />
                  <Text style={styles.caption}>Add a Meal</Text>
                </TouchableOpacity>
              </View>

              <View style={{margin:10, marginLeft: 20}}>
                <Text>Activities</Text>
                {/*render activites */}
                <TouchableOpacity style={styles.addButton} onPress={() => {

                }}>
                  <Icon name='plus' color='#383e47' size={30} />
                  <Text style={styles.caption}>Add an Activity</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }

  _retrieveData = async () => {
    console.log("getting data")
    try {
      const tok = await AsyncStorage.getItem('token');
      if (tok !== null) {
        // We have data!!
        //didnt use set state cause its in component di mount
        this.state.token = tok;
      }
      const use = await AsyncStorage.getItem('username');
      if (use !== null) {
        // We have data!!
        //didnt use set state cause its in component di mount
        this.state.username = use;
      }
      this.fetchAndSet();
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    this._retrieveData();


  }

  _keyboardDidShow() {
    console.log('keyboard shown')
  }

  _keyboardDidHide() {
    console.log('keyboard hidden')
  }

  fetchAndSet() {
    console.log("NewLine at Profile fetching")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        this.setState({
          firstname: result.firstName,
          lastname: result.lastName,
          goalactivity: result.goalDailyActivity.toString(),
          goalcalories: result.goalDailyCalories.toString(),
          goalcarbo: result.goalDailyCarbohydrates.toString(),
          goalfat: result.goalDailyFat.toString(),
          goalprotein: result.goalDailyProtein.toString(),
        })
      })
      .catch(error => console.log('error', error));
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
  logo: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 40
  },
  caption:{
    color: '#036480',
    fontSize: 10,
  },
  subtitle: {
    marginTop: 5,
    marginLeft: 40,
    fontSize: 15
  },
  addButton: {
    backgroundColor: '#e9eef7',
    width: '75%',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 5,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
});

export default Home;
