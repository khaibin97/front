import React, { Component } from "react";
import {
  StyleSheet, View,
  Text, TextInput,
  Keyboard, KeyboardAvoidingView,
  TouchableWithoutFeedback, TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import LogoutButton from '../components/LogoutButton';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      token: 'default',
      username: 'default',
      firstname: 'default',
      lastname: 'default',
      goalcalories: '0',
      goalprotein: '0',
      goalcarbo: '0',
      goalfat: '0',
      goalactivity: '0',
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.logo}>A Fitness App</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.header}>Profile: {this.state.username}</Text>
            <LogoutButton style={{ flex: 1, marginRight: 5, marginTop: 10 }} function={() => this.props.navigation.navigate('Login')} />
          </View>

          <Text style={styles.header, { fontSize: 20, marginLeft: 20, marginTop: 10, }}>Name</Text>

          <TextInput placeholder="First Name"
            defaultValue={this.state.firstname}
            style={styles.textInput1}
            selectTextOnFocus={true}
            onChangeText={input => { this.setState({ firstname: input }) }}
          />

          <TextInput placeholder="Last Name"
            defaultValue={this.state.lastname}
            style={styles.textInput1}
            selectTextOnFocus={true}
            onChangeText={input => { this.setState({ lastname: input }) }}
          />

          <Text style={styles.header, { fontSize: 20, marginLeft: 20, marginTop: 10, }}>Daily Goals</Text>

          <View style={styles.fieldEntry}>
            <Text style={styles.label}>Calories</Text>
            <Text style={styles.colunn}>:</Text>
            <TextInput placeholder="Calories"
              defaultValue={this.state.goalcalories === "0" ? "" : this.state.goalcalories}
              style={styles.textInput2}
              selectTextOnFocus={true}
              onChangeText={input => { this.setState({ goalcalories: input }) }}
            />
          </View>

          <View style={styles.fieldEntry}>
            <Text style={styles.label}>Protein</Text>
            <Text style={styles.colunn}>:</Text>
            <TextInput placeholder="Protein"
              defaultValue={this.state.goalprotein === "0" ? "" : this.state.goalprotein}
              style={styles.textInput2}
              selectTextOnFocus={true}
              onChangeText={input => { this.setState({ goalprotein: input }) }}
            />
          </View>

          <View style={styles.fieldEntry}>
            <Text style={styles.label}>Carbohydrates</Text>
            <Text style={styles.colunn}>:</Text>
            <TextInput placeholder="Carbohydrates"
              defaultValue={this.state.goalcarbo === "0" ? "" : this.state.goalcarbo}
              style={styles.textInput2}
              selectTextOnFocus={true}
              onChangeText={input => { this.setState({ goalcarbo: input }) }}
            />
          </View>

          <View style={styles.fieldEntry}>
            <Text style={styles.label}>Fat</Text>
            <Text style={styles.colunn}>:</Text>
            <TextInput placeholder="Fat"
              defaultValue={this.state.goalfat === "0" ? "" : this.state.goalfat}
              style={styles.textInput2}
              selectTextOnFocus={true}
              onChangeText={input => { this.setState({ goalfat: input }) }}
            />
          </View>

          <View style={styles.fieldEntry}>
            <Text style={styles.label}>Activity</Text>
            <Text style={styles.colunn}>:</Text>
            <TextInput placeholder="Activity"
              defaultValue={this.state.goalactivity === "0" ? "" : this.state.goalactivity}
              style={styles.textInput2}
              selectTextOnFocus={true}
              onChangeText={input => { this.setState({ goalactivity: input }) }}
            />
          </View>

          <TouchableOpacity style={styles.save} onPress={() => {
            Alert.alert(
              'Saving ...',
              'Do you want to save the information entered?',
              [{ text: 'Save', onPress: () => this.upload() }, { text: 'Cancel', style: 'cancel' }],
              { cancelable: true },
            )
          }
          }>
            <Text style={styles.caption}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.delete} onPress={() => {
            Alert.alert(
              'Deleting ...',
              'Do you really want to delete account?',
              [{ text: 'YES', onPress: () => this.delete() }, { text: 'Cancel', style: 'cancel' }],
              { cancelable: true },
            )
          }
          }>
            <Text style={styles.caption}>DELETE ACCOUNT</Text>
          </TouchableOpacity>

          {/* {console.log(this.state)} */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );

  }

  _deleteData = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  upload() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.token);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        username: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        goalDailyActivity: this.state.goalactivity,
        goalDailyCalories: this.state.goalcalories,
        goalDailyCarbohydrates: this.state.goalcarbo,
        goalDailyFat: this.state.goalfat,
        goalDailyProtein: this.state.goalprotein,
      }),
      redirect: 'follow'
    };

    fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.message)
        if (result.message === "User has been updated!") {
          Alert.alert(
            'Success!',
            result.message,
            [{ text: 'Close' }],
            { cancelable: true },
          )
        } else if (result.message) {
          Alert.alert(
            'Hmmm...',
            result.message,
            [{ text: 'Close' }],
            { cancelable: true },
          )
        }
      })
      .catch(error => {
        console.log('error', error)
      });
  }

  delete() {

    let headers = new Headers();

    headers.append("x-access-token", this.state.token);

    var requestOptions = {
      method: 'DELETE',
      headers: headers,
      redirect: 'follow'
    };


    fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson.message) {
          Alert.alert(
            responseJson.message,
            "",
            [
              { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
            ],
            { cancelable: false },
          );
        } else {
          //delete failed
        }

      })
      .catch((error) => {
        console.error(error);
      });

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
      return;
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

    this.setState({ loaded: true })
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
    marginTop: 20,
    marginLeft: 20,
    fontSize: 40
  },
  fieldEntry: {
    width: '80%',
    flexDirection: "row",
    alignSelf: 'center',
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    marginTop: 10,
    paddingLeft: 5,
  },
  label: {
    width: 100,
  },
  colunn: {
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    flex: 5,
    marginTop: 10,
    marginLeft: 20,
    fontSize: 24
  },
  textInput1: {
    width: '80%',
    height: 43,
    alignSelf: "stretch",
    borderColor: "#000",
    fontSize: 16,
    lineHeight: 16,
    alignSelf: 'center',
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    marginTop: 10,
    paddingLeft: 5,
  },
  textInput2: {
    width: '60%',
    height: 43,
    alignSelf: "stretch",
    borderColor: "#000",
    lineHeight: 16,
    fontSize: 16,
  },
  save: {
    width: 100,
    height: 36,
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: "#2196F3",
    textAlign: "center",
    elevation: 2,
    minWidth: 88,
    borderRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  delete: {
    height: 36,
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: "red",
    textAlign: "center",
    elevation: 2,
    minWidth: 100,
    borderRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    alignSelf: 'center',
    color: "#fff",
    fontSize: 14,
    margin: 10,
  }
});

export default Profile;
