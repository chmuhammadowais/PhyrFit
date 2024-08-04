import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView, ActivityIndicator,
} from "react-native";
import Button from "../Components/Button";
import Styles from "../assets/Styles";
import InputField from "../Components/InputField";
import Snackbar from "../Components/Snackbar";
import { Colors } from "../assets/colors/colors";

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
    } else if (!email.trim().includes("@") || !email.trim().endsWith(".com")) {
      setError("Please provide a valid email address");
      setLoaderVisibility(false);
    } else if (password.trim().length < 6) {
      setError("Password should contain more than 6 characters");
      setLoaderVisibility(false);
    } else if (Number(age.trim()) <= 0 || Number(age.trim() <= 12)) {
      setError("Age requirement is 13 and above");
      setLoaderVisibility(false);
    } else {
      setError("");
      try {
        const timeoutMs = 30000;
        const response = await Promise.race([
          fetch(`http://192.168.0.106:3000/users/register`, {
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
            setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
          ),
        ]);

        // Check if response exists
        if (response) {
          // Check if response status is in the range 200-299 (indicating success)
          if (response.status >= 200 && response.status < 300) {
            // If request is successful, proceed with further actions
            const data = await response.text();
            const dataJson = JSON.parse(data);
            console.log(dataJson);
            if (dataJson.success === true) {
              setIsVisible(true);
            }
          }
        } else {
          // If response is null (indicating timeout), set error message
          setError("Request timed out. Please try again later.");
        }
      } catch (error) {
        // If an error occurs during the request, log it and set error message
        console.error(error);
        setError("An error occurred. Please try again later.");
      }
      finally {
        setError("");
        setLoaderVisibility(false);
      }
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
  }, [setKeyboardAvailable]);

  return (
    <View style={Styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={Styles.sub_container_a}>
        <Image
          style={Styles.logo}
          source={require("../assets/icons/app-logo.png")}
        />
      </View>
      {loaderVisibility ? <ActivityIndicator/> : null}
      <KeyboardAvoidingView
        style={Styles.sub_container_b}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={50}
      >
        <Text style={Styles.form_heading}>SignUp</Text>
        <Text style={Styles.errorText}>{error}</Text>
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
      {isVisible ? (
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
          messageStyle={{}}
          actionTextStyle={{}}
        />
      ) : null}
    </View>
  );
}
