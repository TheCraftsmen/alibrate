import React from 'react';
import { 
  View, Image, ScrollView, FlatList, Text, TextInput, Button 
} from 'react-native';
import axios from 'axios';

export default class TopBooksByGlobalRatingScreen extends React.Component {

  static navigationOptions = {
    title: 'Más Leídos',
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
    if (this.state.data.length > 99)
      return;
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
            <View style={{flex: 10, flexDirection: 'row', justifyContent: 'flex-start'}}> 
              <View>
                <Image
                  style={{width: 50, height: 100}}
                  source={{uri: 'https://covers.alibrate.com/' + item.cover + '/small'}}
                />
              </View>
              <View>
                <Text style={{fontSize:18, fontWeight: 'bold'}}>{item.title}</Text>
                <Text style={{fontWeight: 'bold'}}>{item.author}</Text>
                <Text>{item.genre}</Text>
              </View>
            </View>
          }
        />
      </ScrollView>
    );
  }
}