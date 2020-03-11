import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomField from '../components/CustomField';
import CustomButton from '../components/CustomButton';
import NeomorphicButton from '../components/NeomorphicButton';

import { AuthContext } from '../../App';


const SignIn = ({ navigation }) => {

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



const RenderImage = ({ borderRadius, imageURL }) => {

  if(imageURL) {
    return(
      <Image source={require('../../assets/logo.png')} style={[styles.logo, { borderRadius }]}  />
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

export default function Register({ navigation }) {
  const [ imageURL, setImageURL ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');

  const { signUp } = React.useContext(AuthContext);

  useEffect(()=>{
    StatusBar.setHidden(true);
  },[])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <NeomorphicButton height={100} width={100}>
        <RenderImage borderRadius={25} imageURL={imageURL}/>
      </NeomorphicButton>
      
      <CustomField 
        title="Name" 
        value={name} 
        onChangeText={name => setName(name)}
      />
      <CustomField 
        title="Email" 
        value={email} 
        onChangeText={email => setEmail(email)}
      />
      <CustomField 
        title="Password" 
        value={password} 
        onChangeText={password => setPassword(password)}
      />

      <CustomButton onPress={() => signUp({ name, imageURL, email, password })}>Sign Up</CustomButton>

      <SignIn navigation={navigation} />
    </KeyboardAvoidingView>
  );
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