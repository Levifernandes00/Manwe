import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import CustomField from "../components/CustomField";
import CustomButton from "../components/CustomButton";

import { signIn } from "../services/authApi";

const SignUp = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Register")}
      style={styles.signUpButton}
    >
      <Text style={{ color: "#fff" }}>Don't have an account yet?</Text>
      <Text style={styles.signUp}> Sign Up </Text>
    </TouchableOpacity>
  );
};

export default function screens({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <CustomField
        title="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <CustomField
        title="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />

      <CustomButton
        onPress={() => {
          signIn({ email, password });
          navigation.navigate("App");
        }}
      >
        Sign In
      </CustomButton>

      <SignUp navigation={navigation} />
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
    height: 75
  },

  signUpButton: {
    flexDirection: "row",
    marginTop: 30
  },

  signUp: {
    fontWeight: "bold",
    color: "#F8A700",
    fontSize: 14
  }
});
