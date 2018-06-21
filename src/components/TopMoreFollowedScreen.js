import React from 'react';
import { 
  View, Image, ScrollView, FlatList, Text, TextInput, Button 
} from 'react-native';
import {RkButton} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import axios from 'axios';

class TopMoreFollowedScreen extends React.Component {

  static navigationOptions = {
    title: 'Más Seguidos',
  };

  constructor(props) {
    super(props);
    this.state = { data: [], current_page: 1};
    this._ItemLoadMore = this._ItemLoadMore.bind(this);
    this._followUser = this._followUser.bind(this);
  }

  extractKey = item => item._id;

  componentDidMount(){
    const { navigation } = this.props;
    const access_token = navigation.getParam('access_token', '');
    this.setState({access_token: access_token})
    axios
    .get('https://api.alibrate.com/v1/rankings/topMoreFollowed?page=1&limit=20', { 
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
    if (this.state.data.length > 99)
      return;
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

  _followUser(id){
    axios
    .post('https://api.alibrate.com/v1/follower/follow',
      {
        user_to_follow :{_id: id}
      }, 
      { 
        headers: { Authorization: "Bearer " + this.state.access_token }
      }
    )
    .then((response) => {
      const data = this.state.data.map((item) => {
        if (item._id == id)
          return Object.assign(item, {iAmFollow: true});
        else {
          return item;
        }
      });
      this.setState({data: data});
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
            <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View>
                  <Image
                    style={{width: 50, height: 50, borderRadius:30}}
                    source={{uri: item.profile.picture}}
                  />
                </View>
                <View>
                  <Text style={{fontSize:18, fontWeight: 'bold'}}>{item.username}</Text>
                  <Text style={{color: 'darkgrey', fontSize:12, fontWeight: 'bold'}}>Seguidores: {item.count}</Text>
                </View>
              </View>
              <View>
                {
                  item.iAmFollow ?
                  <RkButton rkType='outline'>Siguiendo</RkButton> :
                  <RkButton rkType='primary' onPress={() => this._followUser(item._id)}>Seguir</RkButton>
                }
              </View>

            </View>
          }
        />
      </ScrollView>
    );
  }
}

export default connect( state => state, {})(TopMoreFollowedScreen);