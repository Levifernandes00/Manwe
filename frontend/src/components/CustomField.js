import React, { Component } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

// import { Container } from './styles';
const CustomInput = ({ title, value, onChangeText }) => {
  if(title === 'Password'){
    return(
      <TextInput 
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={true}
      />
    );
  }

  return(
    <TextInput 
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  );
}


export default class CustomField extends Component {
  render() {
    const { title, value, onChangeText } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{ title }</Text>
        <CustomInput title={title} value={value} onChangeText={onChangeText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    marginTop: 20,
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: '#2E2E2E',
    color: '#e5e5e5',
    paddingLeft: 10,
  },
});