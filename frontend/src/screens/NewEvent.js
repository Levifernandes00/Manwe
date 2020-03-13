import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomField from "../components/CustomField";
import CustomButton from "../components/CustomButton";
import NeomorphicButton from "../components/NeomorphicButton";

import api from "../services/api";

const TopBar = ({ navigation }) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const RenderImage = ({ borderRadius, imageURL }) => {
  if (imageURL) {
    return (
      <Image
        source={require("../../assets/logo.png")}
        style={[styles.logo, { borderRadius }]}
      />
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="ios-add" size={30} color="#fff" />
      </View>
    );
  }
};

export default function Register({ navigation }) {
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const addEvent = async givenData => {
    try {
    } catch (e) {
      const { data } = e.response;
      alert(JSON.stringify(data));
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TopBar navigation={navigation} />
      <Text style={styles.title}>New Event</Text>
      <NeomorphicButton height={100} width={100}>
        <RenderImage borderRadius={25} imageURL={imageURL} />
      </NeomorphicButton>

      <CustomField
        title="Title"
        value={title}
        onChangeText={title => setTitle(title)}
      />
      <CustomField
        title="Date"
        value={date}
        onChangeText={date => setDate(date)}
      />

      <CustomButton onPress={() => addEvent()}>Add Event</CustomButton>
      <Text style={styles.advertisement}>
        You’re going to set an event at your location
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center"
  },

  logo: {
    width: 100,
    height: 100
  },

  topBar: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginTop: -50
  },
  advertisement: {
    color: "#fff",
    marginTop: 10,
    fontSize: 12
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 30
  }
});
