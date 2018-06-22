import React from 'react';
import { View, Image } from 'react-native';
import {RkButton, RkTextInput, RkTheme, RkText} from 'react-native-ui-kitten';
import SvgUri from 'react-native-svg-uri';
import { connect } from 'react-redux';
import SvgTitle from './SvgTitle';
import axios from 'axios';

RkTheme.setType('RkTextInput', 'white', {
  input: {
    backgroundColor: 'white',
    marginLeft: 0,
    marginHorizontal: 0,
  },
  container: {
    paddingHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 5
  },
  placeholderTextColor: 'grey'
});

RkTheme.setType('RkTextInput', 'customsize', {
  container: {
    paddingHorizontal: 4,
  }
});

RkTheme.setType('RkButton', 'facebook', {
  backgroundColor: '#3b5998',
});

class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
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
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
          }}
          source={require('../assets/bg-hero.jpg')}
        />
        <View style={{position:'absolute', top:60, left:60}}>
          <SvgTitle/>
        </View>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 40, paddingLeft:10, paddingRight:10}}>
          <RkText style={{paddingHorizontal: 10, color: 'white', textAlign: 'center', marginBottom: 10, marginTop: 10, fontWeight:'bold', fontSize:18}}>INGRESAR</RkText>
          <RkButton 
            rkType='xlarge customsize facebook'>
            INGRESAR CON FACEBOOK
          </RkButton>
          <RkText style={{paddingHorizontal: 10, color: 'white', textAlign: 'center', paddingTop: 20, paddingBottom: 20}}>
            O CON TU E-MAIL
          </RkText>
          <RkText style={{paddingHorizontal: 10, color: 'white', marginBottom: 0}}>E-mail(o usuario si ya eres miembro)</RkText>
          <RkTextInput 
            placeholder='Ej:blas_kapo@hotmail.com'
            rkType='white'
            fontStyle='italic'
            onChangeText={(email) => this.setState({email: email.toLocaleLowerCase()})}
            value={this.state.email}
          />
          <RkText style={{paddingHorizontal: 10, color: 'white', marginBottom: 0}}>Contraseña</RkText>
          <RkTextInput 
            placeholder='Ingresa tu contraseña'
            rkType='white'
            fontStyle='italic'
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true} 
            value={this.state.password}
          />
          <RkText style={{paddingHorizontal: 10, color: 'white', marginBottom: 0, textAlign: 'center', marginBottom: 10, marginTop: 10}}>Olvidaste tu contraseña?</RkText>
          <RkButton 
            onPress={() => this.loginAlibrate()}
            rkType='xlarge customsize primary'>
            INGRESAR
          </RkButton>
        </View>
      </View>
    );
  }
}

export default connect( state => state, {})(LoginScreen);