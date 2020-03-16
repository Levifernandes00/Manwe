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

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import api from "../services/api";

const TopBar = ({ navigation }) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { update: true })}
      >
        <Ionicons name="ios-arrow-back" color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const RenderImage = ({ borderRadius, imageURL }) => {
  if (imageURL) {
    return (
      <Image
        source={{ uri: `${imageURL}` }}
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
  const [coordinate, setCoordinate] = useState({});
  const [data, setData] = useState(new FormData());

  useEffect(() => {
    StatusBar.setHidden(true);
    getCoordinates();
  }, []);

  const getCoordinates = () => {
    const { latitude, longitude } = navigation.state.params;
    setCoordinate({ latitude, longitude });
  };

  const addEvent = async givenData => {
    try {
      const id = await AsyncStorage.getItem("user");

      let newData;
      newData = data;
      newData.append(
        "information",
        JSON.stringify({ title, date, coordinate })
      );

      const response = await api.post("/events/add", data, {
        headers: {
          id
        }
      });

      console.log(response.data);
      navigation.navigate("Home", { update: true });
    } catch (e) {
      console.log(e);
    }
  };

  selectPicture = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (granted) {
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [1, 1]
      });
      if (!cancelled) {
        setImageURL(uri);
        const newData = new FormData();
        let filename = uri.split("/").pop();

        newData.append("file", {
          uri,
          type: "image/jpeg",
          name: `${filename}`
        });

        setData(newData);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TopBar navigation={navigation} />
      <Text style={styles.title}>New Event</Text>
      <NeomorphicButton
        onPress={() => selectPicture()}
        height={100}
        width={100}
      >
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
