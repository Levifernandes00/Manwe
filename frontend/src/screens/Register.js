import React, { Component } from 'react';

import { View, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomField from '../components/CustomField';
import CustomButton from '../components/CustomButton';
import NeomorphicButton from '../components/NeomorphicButton';

const SignUp = ({ navigation }) => {

  return(
    <TouchableOpacity 
      onPress={() => navigation.navigate('SignIn')}
      style={styles.signUpButton}
    >
      <Text style={{ color: '#fff' }}>
        Don't have an account yet? 
      </Text>
      <Text style={styles.signUp}> Sign In </Text>
    </TouchableOpacity>
  );
}

export default class pages extends Component {
  state={
    imageURL: "",
    email: "",
    password: "",
  }
  
  constructor(){
    super();
    StatusBar.setHidden(true);
  }

  renderImage = (radius) => {
    const { imageURL } = this.state;

    if(imageURL) {
      return(
        <Image source={require('../../assets/logo.png')} style={[styles.logo, { borderRadius: radius }]}  />
      );  
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="ios-add" size={30} color="#fff"/>
        </View>
      );
    }
  }
  
  render() {
    const { email, password } = this.state;
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <NeomorphicButton radius={25}>
          {this.renderImage(25)}
        </NeomorphicButton>
        
        <CustomField 
          title="Email" 
          value={email} 
          onChangeText={email => this.setState({ email })}
        />
        <CustomField 
          title="Password" 
          value={password} 
          onChangeText={password => this.setState({ password })}
        />

        <CustomButton onPress={() => console.log('funfa')}>Sign Up</CustomButton>

        <SignUp navigation={navigation} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 100,
    height: 100,
  },

  signUpButton: {
    flexDirection: 'row',
    marginTop: 30,
  },

  signUp: {
    fontWeight: 'bold',
    color: '#F8A700',
    fontSize: 14,
  },
});