import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

export default class components extends Component {
  render() {
    const { radius, onPress } = this.props;

    const morphTop = {
      width:100,
      height:100,
      color:"#222222",
      border:2,
      radius:radius,
      opacity:0.2,
      x:4,
      y:6,
      style:{marginVertical:5}
    };

    const morphBottom = {
      width:100,
      height:100,
      color:"#404040",
      border:2,
      radius:radius,
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