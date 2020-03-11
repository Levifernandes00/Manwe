import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import NeomorphicButton from './NeomorphicButton';

const EventCard = ({ event }) => {
  const CloseButton = () => {
    return(
      <TouchableOpacity style={{ marginLeft: 'auto' }}>
        <AntDesign name="close" color="#fff" />
      </TouchableOpacity>
    );
  }

  return(
    <NeomorphicButton width={120} height={149}>
      <View style={{ flex: 1, padding: 10, }}>
        <CloseButton/>
        <Image
          style={styles.image} 
          source={{ uri: 'https://images.unsplash.com/photo-1583841046282-570c1f88e8be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80' }} 
        />
        <Text style={styles.title}>Event</Text>
        <Text style={styles.date}>Date 03/18 8pm</Text>
      </View>
    </NeomorphicButton>
  );
}

export default class components extends Component {
  render() {
    const { events } = this.props;

    return(
      <View style={styles.container}>
        <EventCard event={10} />
        <EventCard event={10} />
        <EventCard event={10} />
        <EventCard event={10} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },

  image: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    marginTop: 6,
    borderRadius: 15,
  },

  title: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },

  date: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: '#F8A700'
  },

});