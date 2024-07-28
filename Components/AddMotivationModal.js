import React, { useState } from "react";
import {View, Text, Modal, KeyboardAvoidingView, Platform} from "react-native";
import Button from "../Components/Button";
import InputField from "./InputField";
import Styles from "../assets/Styles";

export default function AddMotivationMoa({
  modalVisible,
  setModalVisible,
  setSavedText,
}) {
  const [inputText, setInputText] = useState("");

  const handleSave = () => {
    setSavedText(inputText);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={30}
          style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <Text style={[Styles.cardViewHeading, {marginBottom: 30}]}>Enter your text:</Text>
          <InputField setText={setInputText} text={inputText} />
          <View style={Styles.sub_container_horizontal}>
            <Button
              text="Save"
              onPress={handleSave}
              customStyle={{ width: "40%" }}
            />
            <Button
              text="Cancel"
              onPress={() => setModalVisible(false)}
              customStyle={{ width: "40%" }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
