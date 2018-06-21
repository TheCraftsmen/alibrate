import React from 'react';
import { 
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import LoginScreen from './LoginScreen';
import TopBooksByGlobalRatingScreen from './TopBooksByGlobalRatingScreen';
import TopMoreFollowedScreen from './TopMoreFollowedScreen';


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