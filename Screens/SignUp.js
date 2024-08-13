import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Button from "../Components/Button";
import Styles from "../assets/Styles";
import InputField from "../Components/InputField";
import Snackbar from "../Components/Snackbar";
import { Colors } from "../assets/colors/colors";
import Constants from "expo-constants";

export default function SignUp({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [isKeyboardAvailable, setKeyboardAvailable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const extras = Constants.expoConfig.extras;
  function clearForm() {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setHeight("");
    setWeight("");
    setAge("");
    setError("");
  }

  async function handleSignup() {
    setLoaderVisibility(true);

    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === "" ||
      age.trim() === "" ||
      height.trim() === "" ||
      weight.trim() === ""
    ) {
      setError("Please enter all the fields.");
      setLoaderVisibility(false);
      return;
    } else if (!email.trim().includes("@") || !email.trim().endsWith(".com")) {
      setError("Please provide a valid email address.");
      setLoaderVisibility(false);
      return;
    } else if (password.trim().length < 6) {
      setError("Password should contain more than 6 characters.");
      setLoaderVisibility(false);
      return;
    } else if (Number(age.trim()) <= 12) {
      setError("Age requirement is 13 and above.");
      setLoaderVisibility(false);
      return;
    }

    setError("");
    try {
      const response = await Promise.race([
        fetch(`http://${extras.IP_ADDRESS}:${extras.PORT}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email: email,
            password: password,
            age: age,
            phone: phone,
            height: height,
            weight: weight,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 30000)
        ),
      ]);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to register. Please try again.");
      } else {
        const data = await response.json();
        if (data.success) {
          setIsVisible(true);
        } else {
          setError(data.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoaderVisibility(false);
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardAvailable(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardAvailable(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={Styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={Styles.sub_container_a}>
        <Image
          style={Styles.logo}
          source={require("../assets/icons/app-logo.png")}
        />
      </View>
      {loaderVisibility && <ActivityIndicator />}
      <KeyboardAvoidingView
        style={Styles.sub_container_b}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={50}
      >
        <Text style={Styles.form_heading}>SignUp</Text>
        {error ? <Text style={Styles.errorText}>{error}</Text> : null}
        <ScrollView contentContainerStyle={Styles.scrollContainer}>
          <InputField
            style={Styles.input_container}
            placeholder={"Full Name"}
            text={fullName}
            setText={setFullName}
          />
          <InputField
            style={Styles.input_container}
            placeholder={"Email"}
            inputMode={"email"}
            keyboardType={"email-address"}
            text={email}
            setText={setEmail}
          />
          <InputField
            style={Styles.input_container}
            placeholder={"Password"}
            secureTextEntry
            text={password}
            setText={setPassword}
          />
          <InputField
            style={Styles.input_container}
            placeholder={"Phone"}
            inputMode={"tel"}
            text={phone}
            setText={setPhone}
          />
          <InputField
            style={Styles.input_container}
            placeholder={"Age"}
            keyboardType={"numeric"}
            text={age}
            setText={setAge}
          />
          <View style={Styles.sub_container_horizontal}>
            <InputField
              placeholder={"Height (cm)"}
              secureTextEntry={false}
              keyboardType={"decimal-pad"}
              width={"48%"}
              text={height}
              setText={setHeight}
            />
            <InputField
              placeholder={"Weight (KG)"}
              secureTextEntry={false}
              keyboardType={"decimal-pad"}
              width={"48%"}
              text={weight}
              setText={setWeight}
            />
          </View>
        </ScrollView>
        <Button
          text={"Sign up"}
          onPress={handleSignup}
          customStyle={isKeyboardAvailable ? { marginBottom: -20 } : {}}
        />
      </KeyboardAvoidingView>
      {isVisible && (
        <Snackbar
          message="Sign up successful"
          actionText="Dismiss"
          onActionPress={() => {
            setIsVisible(false);
            clearForm();
            navigation.navigate("SignIn");
          }}
          duration={5000}
          position="bottom"
          backgroundColor={Colors.FilledCircleDark}
          textColor="white"
          actionTextColor="white"
          containerStyle={{ marginHorizontal: 12 }}
        />
      )}
    </View>
  );
}
