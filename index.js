import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { configureStore } from './src/reducers/configureStore';
import App from './src/components/App';

const store = configureStore();
const AppNavigator = reduxifyNavigator(App, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(AppNavigator);


class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Alibrate', () => Root);
