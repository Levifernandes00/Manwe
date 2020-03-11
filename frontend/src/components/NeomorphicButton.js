import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

export default class components extends Component {
  render() {
    const { onPress, width, height } = this.props;

    const morphTop = {
      width,
      height,
      color:"#222222",
      border:2,
      radius: 25,
      opacity:0.2,
      x:4,
      y:6,
      style:{marginVertical:5}
    };

    const morphBottom = {
      width,
      height,
      color:"#404040",
      border:2,
      radius: 25,
      opacity:0.2,
      x:-4,
      y:-4,
      style:{marginVertical:5}
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <BoxShadow setting={morphTop} >
          <BoxShadow setting={morphBottom}>
            {this.props.children}
          </BoxShadow>
        </BoxShadow>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  topShadow: {
    padding: 12,
    borderRadius: 12,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: '#000',
    shadowOpacity: 1.0,
    shadowRadius: 18,
  },

  bottomShadow: {
    padding: 12,
    borderRadius: 12,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: '#fff',
    shadowOpacity: 1.0,
    shadowRadius: 18,
  }
});