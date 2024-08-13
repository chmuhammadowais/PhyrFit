import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import Styles from "../assets/Styles";
import React, { useContext, useState } from "react";
import InputField from "../Components/InputField";
import OptionsPicker from "../Components/OptionsPicker";
import { UserContext } from "../Store/store";
import Button from "../Components/Button";
import Snackbar from "../Components/Snackbar";
import LogoutButton from "../Components/LogoutButton";
import { Colors } from "../assets/colors/colors";
import Constants from "expo-constants";

export default function Profile({ navigation }) {
  const { user, addUser, resetData, token } = useContext(UserContext);
  const [id] = useState(user.id);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const items = [
    { label: "Loose Weight", value: "Loose Weight" },
    { label: "Gain Weight", value: "Gain Weight" },
    { label: "Get Fit", value: "Get Fit" },
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const extras = Constants.expoConfig.extras;

  const handleLogout = async () => {
    try {
      setError("");
      setLoaderVisibility(true);
      const timeoutMs = 30000;
      const response = await Promise.race([
        fetch(`http://${extras.IP_ADDRESS}:${extras.PORT}/users/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
        ),
      ]);

      if (response && response.status >= 200 && response.status < 300) {
        const data = await response.json();
        if (data.success) {
          resetData();
          navigation.reset({
            index: 0,
            routes: [{ name: "SignIn" }],
          });
        } else {
          Alert.alert("Error", `${data.message}. Please try again later.`);
        }
      } else {
        Alert.alert(
          "Error",
          "Server did not return a valid response. Please try again later."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    } finally {
      setLoaderVisibility(false);
    }
  };

  const handleUpdate = async () => {
    try {
      if (
        fullName === "" &&
        email === "" &&
        phone === "" &&
        age === "" &&
        height === "" &&
        weight === ""
      ) {
        setError("All input fields cannot be empty.");
        return;
      }
      if (currentPassword === "") {
        setError("Please provide current password.");
        return;
      }
      setLoaderVisibility(true);
      setError("");
      const timeoutMs = 30000;
      const response = await Promise.race([
        fetch(`http://${extras.IP_ADDRESS}:${extras.PORT}/users/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: fullName || user.name,
            email: email || user.email,
            currentPassword,
            newPassword: newPassword || null,
            age: age || user.age,
            phone: phone || user.phone,
            height: height || user.height,
            weight: weight || user.weight,
            goal: selectedItem ? selectedItem.value : user.goal,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
        ),
      ]);

      if (response && response.status >= 200 && response.status < 300) {
        const data = await response.json();
        if (data.success) {
          addUser({
            id,
            name: fullName || user.name,
            email: email || user.email,
            age: age || user.age,
            phone: phone || user.phone,
            height: height || user.height,
            weight: weight || user.weight,
            goal: selectedItem ? selectedItem.value : user.goal,
          });
          setIsVisible(true);
          clearForm();
        } else {
          Alert.alert("Error", `${data.message}. Please try again later.`);
        }
      } else {
        Alert.alert(
          "Error",
          "Server did not return a valid response. Please try again later."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    } finally {
      setLoaderVisibility(false);
    }
  };

  const clearForm = () => {
    setFullName("");
    setEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setPhone("");
    setHeight("");
    setWeight("");
    setAge("");
    setError("");
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.sub_container_c}>
        <Text style={Styles.form_heading}>Profile</Text>
        <LogoutButton onPress={handleLogout} />
      </View>

      {loaderVisibility ? <ActivityIndicator /> : null}

      <Text style={Styles.errorText}>{error}</Text>

      <View style={Styles.sub_container_b}>
        <ScrollView contentContainerStyle={[Styles.scrollContainer]}>
          <InputField
            style={Styles.input_container}
            placeholder={user.name}
            setText={setFullName}
            text={fullName}
          />
          <InputField
            style={Styles.input_container}
            placeholder={user.email}
            inputMode={"email"}
            keyboardType={"email-address"}
            setText={setEmail}
            text={email}
          />
          <InputField
            style={Styles.input_container}
            placeholder={"Current Password"}
            secureTextEntry
            setText={setCurrentPassword}
            text={currentPassword}
          />
          <InputField
            style={Styles.input_container}
            placeholder={"New Password"}
            secureTextEntry
            setText={setNewPassword}
            text={newPassword}
          />
          <InputField
            style={Styles.input_container}
            placeholder={user.phone}
            inputMode={"tel"}
            setText={setPhone}
            text={phone}
          />
          <InputField
            style={Styles.input_container}
            placeholder={user.age.toString()}
            keyboardType={"numeric"}
            setText={setAge}
            text={age}
          />
          <View style={Styles.sub_container_horizontal}>
            <InputField
              placeholder={user.height.toString()}
              keyboardType={"decimal-pad"}
              width={"48%"}
              setText={setHeight}
              text={height}
            />
            <InputField
              placeholder={user.weight.toString()}
              keyboardType={"decimal-pad"}
              width={"48%"}
              setText={setWeight}
              text={weight}
            />
          </View>
          <OptionsPicker
            items={items}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <Button text={"Update"} onPress={handleUpdate} />
        </ScrollView>
      </View>
      <Text style={[Styles.loading_text, { fontSize: 14 }]}>User ID: {id}</Text>
      {isVisible && (
        <Snackbar
          message="Profile updated successfully"
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
