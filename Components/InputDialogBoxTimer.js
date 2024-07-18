import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import Button from "../Components/Button";
import InputField from "./InputField";
import Styles from "../assets/Styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import Reminders from "../Screens/Reminders";

export default function InputDialogBoxTimer({
  reminderHeading,
  reminderDescription,
  setReminderHeading,
  setReminderDescription,
  time,
  setTime,
  showTimePicker,
  setShowTimePicker,
  modalVisible,
  setModalVisible,
  handleSave,
  resetForm,
}) {
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false); // Ensure this hides the picker after a selection
    setTime(currentTime);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <Text style={[Styles.cardViewHeading, { marginBottom: 20 }]}>
            Add Reminder
          </Text>
          <InputField
            placeholder="Reminder"
            setText={setReminderHeading}
            text={reminderHeading}
            width="100%"
          />
          <InputField
            placeholder="Description"
            setText={setReminderDescription}
            text={reminderDescription}
            width="100%"
          />
          <Button text="Pick Time" onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={onTimeChange}
            />
          )}
          <Text style={Styles.buttonText}>
            Selected Time: {time.toLocaleTimeString()}
          </Text>

          <View style={Styles.sub_container_horizontal}>
            <Button
              text="Save"
              onPress={() => {
                handleSave();
              }}
              customStyle={{ width: "40%" }}
            />
            <Button
              text="Cancel"
              onPress={() => {
                setModalVisible(false);
                setShowTimePicker(false);
                resetForm();
              }}
              customStyle={{ width: "40%" }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
