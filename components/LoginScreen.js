import React from 'react';
import { View } from 'react-native';
import {RkButton, RkTextInput, RkTheme, RkText} from 'react-native-ui-kitten';
import axios from 'axios';

RkTheme.setType('RkTextInput', 'white', {
  input: {
    backgroundColor: 'white',
    marginLeft: 0,
    marginHorizontal: 0,
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  placeholderTextColor: 'grey'
});

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'ALIBRATE',
  };

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
    return (
      <View style={{flex: 1, backgroundColor: '#1c4865', paddingTop: 15}}>
        <RkText style={{paddingHorizontal: 10, color: 'white', marginBottom: 0}}>E-mail(o usuario si ya eres miembro)</RkText>
        <RkTextInput 
          placeholder='Ej:blas_kapo@hotmail.com'
          rkType='white'
          onChangeText={(email) => this.setState({email: email.toLocaleLowerCase()})}
          value={this.state.email}
        />
        <RkText style={{paddingHorizontal: 10, color: 'white', marginBottom: 0}}>Contraseña</RkText>
        <RkTextInput 
          placeholder='Ingresa tu contraseña'
          rkType='white'
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true} 
          value={this.state.password}
        />
        <RkButton 
          onPress={() => this.loginAlibrate()}
          rkType='xlarge'>
          INGRESAR
        </RkButton>
      </View>
    );
  }
}