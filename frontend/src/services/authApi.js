import React from "react";
import { AsyncStorage } from "react-native";
// import { Container } from './styles';
import api from "./api";

export const signIn = async givenData => {
  try {
    const { data } = await api.post("/auth/login", givenData);

    const { user, token } = data;

    await AsyncStorage.setItem("user", user);
    await AsyncStorage.setItem("userToken", token);
  } catch (e) {
    const { error } = e.response.data;
    alert(error);
  }
};

export const signUp = async givenData => {
  try {
    const { data } = await api.post("/auth/register", givenData);

    const { user, token } = data;

    await AsyncStorage.setItem("user", user);
    await AsyncStorage.setItem("userToken", token);
  } catch (e) {
    console.log(e.response);
    const { error } = e.response.data;
    alert(error);
  }
};
