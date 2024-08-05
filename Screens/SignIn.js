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

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const userContext = useContext(UserContext); // Access context once

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
      if (email === "test@email.com" && password === "test123") {
        userContext.addUser({
          id: 0,
          name: "Test",
          email: "test@email.com",
          phone: "123-456-789",
          age: "20",
          height: "170",
          weight: "70",
        });
        navigation.navigate("Main");
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        try {
          const timeoutMs = 30000;
          const response = await Promise.race([
            fetch(`http://192.168.0.106:3000/users/login`, {
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
              setTimeout(
                () => reject(new Error("Request timed out")),
                timeoutMs
              )
            ),
          ]);

          // Check if response exists
          if (response) {
            // Check if response status is in the range 200-299 (indicating success)
            if (response.status >= 200 && response.status < 300) {
              // If request is successful, proceed with further actions
              const data = await response.text();
              const dataJson = JSON.parse(data);

              if (dataJson.success === true) {
                userContext.addUser({
                  id: dataJson.user.id,
                  name: dataJson.user.name,
                  email: dataJson.user.email,
                  phone: dataJson.user.phone,
                  age: dataJson.user.age,
                  height: dataJson.user.height,
                  weight: dataJson.user.weight,
                });
                navigation.navigate("Main");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Main" }],
                });
                setLoaderVisibility(false);
              }
            } else if (response.status === 401) {
              setError("Invalid email or password.");
            }
          } else {
            // If response is null (indicating timeout), set error message
            setError("Request timed out. Please try again later.");
          }
        } catch (error) {
          // If an error occurs during the request, log it and set error message
          console.error(error);
          setError("An error occurred. Please try again later.");
        } finally {
          setLoaderVisibility(false);
        }
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
