import React, { Component } from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default class components extends Component {
  render() {
    const { children, onPress } = this.props;

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text
          style={styles.text}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    backgroundColor: '#D27B00',
    height: 30,
    width: '25%',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 8,
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});