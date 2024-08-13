import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Button from "../Components/Button";
import Styles from "../assets/Styles";
import InputField from "../Components/InputField";
import { UserContext } from "../Store/store";
import Constants from "expo-constants";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const userContext = useContext(UserContext);
  const extras = Constants.expoConfig.extras;

  async function signInHandler() {
    console.log(email, password);
    setLoaderVisibility(true);
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter all the fields.");
      setLoaderVisibility(false);
    } else if (!email.trim().includes("@") || !email.trim().endsWith(".com")) {
      setError("Please provide a valid email address");
      setLoaderVisibility(false);
    } else if (password.trim().length < 6) {
      setError("Password should contain more than 6 characters");
      setLoaderVisibility(false);
    } else {
      setError("");
      try {
        const timeoutMs = 30000;
        const response = await Promise.race([
          fetch(`http://${extras.IP_ADDRESS}:${extras.PORT}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
          ),
        ]);

        if (response.status >= 200 && response.status < 300) {
          const data = await response.json();
          if (data.success) {
            // Store user and token in context
            userContext.addUser({
              id: data.user.uid,
              name: data.user.name,
              email: data.user.email,
              phone: data.user.phone,
              age: data.user.age,
              height: data.user.height,
              weight: data.user.weight,
            });

            userContext.setToken(data.idToken);

            navigation.navigate("Main");
            navigation.reset({
              index: 0,
              routes: [{ name: "Main" }],
            });
          } else {
            setError("Server did not returned a valid response.");
          }
        } else {
          setError("Netwoek error");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoaderVisibility(false);
      }
    }
  }

  function signUpHandler() {
    navigation.navigate("SignUp");
  }

  return (
    <View style={Styles.container}>
      <StatusBar barStyle="default" />
      <View style={Styles.sub_container_a}>
        <Image
          style={Styles.logo}
          source={require("../assets/icons/app-logo.png")}
        />
      </View>
      {loaderVisibility ? <ActivityIndicator /> : null}
      <KeyboardAvoidingView
        style={[Styles.sub_container_b, { justifyContent: "flex-start" }]}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={30}
      >
        <Text style={Styles.form_heading}>SignIn</Text>
        <Text style={Styles.errorText}>{error}</Text>
        <InputField
          style={Styles.input_container}
          placeholder="Email"
          autoCapitalize={false}
          inputMode="email"
          keyboardType="email-address"
          setText={setEmail}
        />
        <InputField
          style={Styles.input_container}
          placeholder="Password"
          secureTextEntry
          setText={setPassword}
        />
        <View style={Styles.sub_container_horizontal}>
          <Button text="Sign up" onPress={signUpHandler} />
          <Button text="Sign in" onPress={signInHandler} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
