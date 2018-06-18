import React from 'react';
import { 
  View, Image, ScrollView, FlatList, Text, TextInput, Button 
} from 'react-native'
import { 
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import axios from 'axios';


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.loginAlibrate = this.loginAlibrate.bind(this);
  }

  loginAlibrate(){
    axios
    .post('https://api.alibrate.com/v1/auth/local', {
      username: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      this.props.navigation.navigate('Rankings', {
        access_token: response.data.access_token
      });
    });
  }

  render() {
    const inputStyle = { margin: 15 };
    return (
      <View>
        <Text>E-mail</Text>
        <TextInput
          style={inputStyle}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Text>Contraseña</Text>
        <TextInput
          style={inputStyle}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />
        <Button
          title={"Ingresar"}
          style={inputStyle}
          onPress={() => this.loginAlibrate()}
        />
      </View>
    );
  }
}


class TopBooksByGlobalRatingScreen extends React.Component {

  static navigationOptions = {
    title: 'TopBooksByGlobalRating',
  };

  constructor(props) {
    super(props);
    this.state = { data: [], current_page: 1};
    this._ItemLoadMore = this._ItemLoadMore.bind(this);
  }

  extractKey = item => item._id;

  componentDidMount(){
    const { navigation } = this.props;
    const access_token = navigation.getParam('access_token', '');
    this.setState({access_token: access_token})
    axios
    .get('https://api.alibrate.com/v1/rankings/topBookReadedInLibraries?page=1&limit=20', { 
      headers: { Authorization: "Bearer " + access_token }
    })
    .then((response) => {
      this.setState({data: response.data});
    })
    .catch(function (error) {
      console.warn(error);
    });
  }

  _ItemLoadMore(){
    const new_current_page = this.state.current_page + 1;
    axios
    .get('https://api.alibrate.com/v1/rankings/topBookReadedInLibraries?page=' + new_current_page + '&limit=20', { 
      headers: { Authorization: "Bearer " + this.state.access_token }
    })
    .then((response) => {
      const new_data = this.state.data.concat(response.data);
      this.setState({data: new_data, current_page: new_current_page});
    })
    .catch(function (error) {
      console.warn(error);
    });
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          keyExtractor={this.extractKey}
          data={this.state.data}
          onEndReachedThreshold={2}
          onEndReached={({ distanceFromEnd }) => {
            this._ItemLoadMore();
          }}
          renderItem={({item}) =>
            <View> 
              <Image
                style={{width: 50, height: 100}}
                source={{uri: 'https://covers.alibrate.com/' + item.cover + '/small'}}
              />
              <Text>{item.genre}</Text>
              <Text>{item.title}</Text>
              <Text>{item.author}</Text>
            </View>
          }
        />
      </ScrollView>
    );
  }
}

class TopMoreFollowedScreen extends React.Component {

  static navigationOptions = {
    title: 'TopMoreFollowed',
  };

  constructor(props) {
    super(props);
    this.state = { data: [], current_page: 1};
    this._ItemLoadMore = this._ItemLoadMore.bind(this);
  }

  extractKey = item => item._id;

  componentDidMount(){
    const { navigation } = this.props;
    const access_token = navigation.getParam('access_token', '');
    this.setState({access_token: access_token})
    axios
    .get('https://api.alibrate.com/v1/rankings/topMoreFollowed?page=10&limit=20', { 
      headers: { Authorization: "Bearer " + access_token }
    })
    .then((response) => {
      this.setState({data: response.data});
    })
    .catch(function (error) {
      console.warn(error);
    });
  }

  _ItemLoadMore(){
    const new_current_page = this.state.current_page + 1;
    axios
    .get('https://api.alibrate.com/v1/rankings/topMoreFollowed?page=' + new_current_page + '&limit=20', { 
      headers: { Authorization: "Bearer " + this.state.access_token }
    })
    .then((response) => {
      const new_data = this.state.data.concat(response.data);
      this.setState({data: new_data, current_page: new_current_page});
    })
    .catch(function (error) {
      console.warn(error);
    });
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          keyExtractor={this.extractKey}
          data={this.state.data}
          onEndReachedThreshold={2}
          onEndReached={({ distanceFromEnd }) => {
            this._ItemLoadMore();
          }}
          renderItem={({item}) => 
            <View>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: item.profile.picture}}
              />
              <Text>{item.username}</Text>
              <Text>Seguidores: {item.count}</Text>
              <Text>{item.iAmFollow ? "Siguiendo": "Seguir"}</Text>
            </View>
          }
        />
      </ScrollView>
    );
  }
}

const RankingsStack = createBottomTabNavigator({
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