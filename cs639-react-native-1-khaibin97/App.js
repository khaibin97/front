import React from 'react';
import { View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Modal from './Modal';
import Button from './Button';
import { StackActions } from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Button buttonStyle={{backgroundColor: '#aaaaaa', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10}} textStyle={{color: '#ffffff'}} text={'Show Modal'} onPress={() => this.showModal()}/>
        <Modal width={300} height={600} show={this.state.showModal} hide={() => this.hideModal()}/> */}
        <AppContainer/>
      </View>
    );
  }

  showModal() {
    this.setState({showModal: true});
  }

  hideModal() {
    this.setState({showModal: false});
  }
}

const AppNavigator = createStackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  Profile: {screen: Profile}
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerMode: 'none',
    headervisible: false,
    header: null,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default App;
