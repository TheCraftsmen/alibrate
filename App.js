import React from 'react';
import { 
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import TopBooksByGlobalRatingScreen from './components/TopBooksByGlobalRatingScreen';
import TopMoreFollowedScreen from './components/TopMoreFollowedScreen';


const RankingsStack = createMaterialTopTabNavigator({
  TopMoreFollowed: TopMoreFollowedScreen,
  TopBooksByGlobalRating: TopBooksByGlobalRatingScreen,
});


export default createStackNavigator(
  {
    Login: LoginScreen,
    Rankings: RankingsStack,
  },
  {
    initialRouteName: 'Login',
  }
);