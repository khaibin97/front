import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Modal from './Modal';
import Button from './Button';
import { StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
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
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    );
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }
}

const TabNav = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel:"Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color="#2548D2" />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel:"Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={30} color="#2548D2" />
        )
      },
    },
  }, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerMode: 'none',
    headervisible: false,
    header: null,
  },
  tabBarOptions:{
    activeBackgroundColor: '#383e47',
    activeTintColor: '#e9eef7',
  },
},
);

const StackNav = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
  }, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerMode: 'none',
    headervisible: false,
    header: null,
  },
});

const AppNavigator = createSwitchNavigator({
  Stack: StackNav,
  Tab: TabNav,
}, {
  initialRouteName: 'Stack',
  defaultNavigationOptions: {
    headerMode: 'none',
    headervisible: false,
    header: null,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default App;
