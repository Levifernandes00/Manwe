import React, { Component } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  AsyncStorage
} from "react-native";

export default class Splash extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
    this._asyncBootstrap();
  }

  _asyncBootstrap = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#282828"
        }}
      >
        <Text style={{ color: "#fff" }}>Loading ...</Text>
        <ActivityIndicator style={{ marginTop: 20 }} color="#F8A700" />
      </View>
    );
  }
}
