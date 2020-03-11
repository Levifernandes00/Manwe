import React, { useState, useEffect, useContext } from 'react';

import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import NeomorphicButton from '../components/NeomorphicButton';
import EventSection from '../components/EventSection';

import { AuthContext } from '../../App';

const TopBar = () => {
  const { signOut } = useContext(AuthContext);

  return(
    <View style={styles.topBar}>
      <TouchableOpacity onPress={()=>console.log('funfa')}>
       <Ionicons name="ios-arrow-back" color="#fff" size={20}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginLeft: 'auto' }}
        onPress={()=>signOut()}
      >
        <MaterialCommunityIcons name="logout" color="#999" size={15}  />
      </TouchableOpacity>
    </View>
  );
}

const RenderImage = ({ radius, imageURL }) => {

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

const UserInformation = ({ user }) => {
  return(
    <View style={{ alignItems: 'center' }}>
      <NeomorphicButton width={80} height={80}>
        <RenderImage radius={25} imageURL={user.imageURL} />
      </NeomorphicButton>

      <Text style={styles.name}>Name</Text>
    </View>
  );
}

export default function Profile({ navigation }) {
  const [user, setUser] = useState({});
  const [ events, setEvents ] = useState([]);
 

  useEffect(() => {
    StatusBar.setHidden(true);
  } ,[])
  
  return (
    <View style={styles.container} >
      <TopBar />
      <UserInformation user={user} />
      <EventSection events={events}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 30,
  },

  topBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center'
  },

  name: {
    marginTop: 10,
    color: '#F8A700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});