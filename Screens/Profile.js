import {Alert, ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import React, { useContext, useState } from "react";
import InputField from "../Components/InputField";
import OptionsPicker from "../Components/OptionsPicker";
import { UserContext } from "../Store/store";
import Button from "../Components/Button";
import LogoutButton from "../Components/LogoutButton";

export default function Profile({navigation}) {
  const { user, resetData } = useContext(UserContext);  // Get resetData from context
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(user.phone);
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [age, setAge] = useState(user.age);
  const [error, setError] = useState("");
  const items = [
    { label: "Loose Weight", value: "Loose Weight" },
    { label: "Gain Weight", value: "Gain Weight" },
    { label: "Get Fit", value: "Get Fit" },
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const handleLogout = async () => {
    try {
      const timeoutMs = 30000;
      const response = await Promise.race([
        fetch(`http://192.168.0.106:3000/users/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
          console.log(dataJson)
          if (dataJson.success === true) {
            resetData();
            navigation.navigate("SignIn");
            navigation.reset({
              index: 0,
              routes: [{ name: "SignIn" }],
            });
          }
          else if(dataJson.success === false){
           Alert.alert("Error", `${dataJson.message}. Please try again later.`)
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
      setError("")
    }
  }
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
  return (
      <View style={Styles.container}>
        <View style={Styles.sub_container_c}>
          <Text style={Styles.form_heading}>Profile</Text>
          <LogoutButton onPress={handleLogout} />
        </View>
        <Text style={Styles.errorText}>{error}</Text>
        <View style={Styles.sub_container_b}>
          <ScrollView
              contentContainerStyle={[Styles.scrollContainer]}
          >
            <InputField
                style={Styles.input_container}
                placeholder={fullName}
                setText={setFullName}
            />
            <InputField
                style={Styles.input_container}
                placeholder={email}
                inputMode={"email"}
                keyboardType={"email-address"}
                setText={setEmail}
            />
            <InputField
                style={Styles.input_container}
                placeholder={"Password"}
                secureTextEntry
                setText={setPassword}
            />
            <InputField
                style={Styles.input_container}
                placeholder={phone}
                inputMode={"tel"}
                setText={setPhone}
            />
            <InputField
                style={Styles.input_container}
                placeholder={`${age} Years`}
                keyboardType={"numeric"}
                setText={setAge}
            />
            <View style={Styles.sub_container_horizontal}>
              <InputField
                  placeholder={`${height} cm`}
                  secureTextEntry={false}
                  keyboardType={"decimal-pad"}
                  width={"48%"}
                  setText={setHeight}
              />
              <InputField
                  placeholder={`${weight} KG`}
                  secureTextEntry={false}
                  keyboardType={"decimal-pad"}
                  width={"48%"}
                  setText={setWeight}
              />
            </View>
            <OptionsPicker
                items={items}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <Button text={"Update"} />
          </ScrollView>
        </View>
      </View>
  );
}
