import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons, Feather } from "@expo/vector-icons";

import NeomorphicButton from "../components/NeomorphicButton";
import NeomorphicView from "../components/NeomorphicView";

const NewButton = ({ onPress, type }) => {
  if (type === "user") {
    return (
      <NeomorphicButton
        onPress={onPress}
        style={{ marginTop: 20 }}
        height={50}
        width={50}
      >
        <View style={styles.buttonBackground}>
          <Feather name="user" size={20} color="#F8A700" />
        </View>
      </NeomorphicButton>
    );
  } else if (type === "event") {
    return (
      <NeomorphicButton
        onPress={onPress}
        style={{ marginTop: "auto" }}
        height={50}
        width={50}
      >
        <View style={styles.buttonBackground}>
          <Ionicons name="ios-add" size={30} color="#F8A700" />
        </View>
      </NeomorphicButton>
    );
  }
};

const CustomCallout = marker => {
  return (
    <Callout tooltip={true}>
      <View style={styles.calloutView}>
        <Text style={styles.title}>{marker.title}</Text>
        <Text style={styles.date}>{marker.date}</Text>
      </View>
    </Callout>
  );
};

const CustomMarker = marker => {
  return (
    <Marker {...marker}>
      <NeomorphicView height={50} width={50}>
        <Image
          source={{ uri: `${marker.imageURL}` }}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </NeomorphicView>
      <CustomCallout {...marker} />
    </Marker>
  );
};

export default class pages extends Component {
  state = {
    region: {
      latitudeDelta: 0.015,
      longitudeDelta: 0.015
    },
    markers: [
      {
        coordinate: { latitude: -23.55, longitude: -46.569336 },
        imageURL:
          "https://images.unsplash.com/photo-1584036224416-d6be110d7a80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        title: "Coffee",
        date: "20/08 5pm"
      },
      {
        coordinate: { latitude: -23.559992, longitude: -46.569336 },
        imageURL:
          "https://images.unsplash.com/photo-1558981033-f5e2ddd9c57e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        title: "Motorcycle Event",
        date: "20/08 5pm"
      }
    ]
  };

  constructor() {
    super();
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      alert("Location not allowed");
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const { longitude, latitude } = coords;

    this.setState({ region: { ...this.state.region, longitude, latitude } });
  };

  mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121"
        }
      ]
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d"
        }
      ]
    }
  ];
  render() {
    const { region, markers } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={region}
          style={{ flex: 1 }}
          customMapStyle={this.mapStyle}
        >
          {markers.map(marker => (
            <CustomMarker {...marker} />
          ))}
        </MapView>
        <View style={styles.buttonsContainer}>
          <NewButton
            onPress={() => navigation.navigate("Profile")}
            type="user"
          />
          <NewButton
            onPress={() => navigation.navigate("NewEvent")}
            type="event"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {},
  buttonsContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    padding: 20
  },
  buttonBackground: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: "#282828",
    justifyContent: "center",
    alignItems: "center"
  },
  calloutView: {
    backgroundColor: "#282828",
    width: 150,
    padding: 10
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  date: {
    color: "#F8A700",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: "auto",
    marginTop: 10
  }
});
