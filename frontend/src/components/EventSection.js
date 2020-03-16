import React, { Component } from "react";

import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import NeomorphicButton from "./NeomorphicButton";

import api, { BASE_URL } from "../services/api";

const EventCard = ({ event }) => {
  const CloseButton = () => {
    const deleteEvent = async () => {
      await api.delete(`/events/${event._id}`);
    };

    return (
      <TouchableOpacity
        onPress={() => deleteEvent()}
        style={{ marginLeft: "auto" }}
      >
        <AntDesign name="close" color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <NeomorphicButton width={120} height={149}>
      <View style={{ flex: 1, padding: 10 }}>
        <CloseButton />
        <Image
          style={styles.image}
          source={{
            uri: `${BASE_URL}${event.imageURL}`
          }}
        />
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.date}>{event.date}</Text>
      </View>
    </NeomorphicButton>
  );
};

export default class components extends Component {
  render() {
    const { events } = this.props;

    return (
      <View style={styles.container}>
        {events &&
          events.map(event => <EventCard key={event._id} event={event} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,

    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",

    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "baseline"
  },

  image: {
    height: 60,
    width: 60,
    alignSelf: "center",
    marginTop: 6,
    borderRadius: 15
  },

  title: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5
  },

  date: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    color: "#F8A700"
  }
});
