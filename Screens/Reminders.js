import { ScrollView, Text, View } from "react-native";
import Styles from "../assets/Styles";
import React, { useState } from "react";
import Button from "../Components/Button";
import AddReminderModal from "../Components/AddReminderModal";
import ReminderCardView from "../Components/ReminderCardView";

export default function Reminders() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderHeading, setReminderHeading] = useState("");
  const [reminderDescription, setReminderDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState([
    {
      heading: "Workout 1",
      description: "Hit the gym man",
      time: "12:00 am",
      isCompleted: false
    },
    {
      heading: "Workout 2",
      description: "Hit the gym man",
      time: "12:00 am",
      isCompleted: false
    },
  ]);
  const handleCompletion = (heading) => {
    setReminders((prevReminders) =>
        prevReminders.map((reminder) =>
            reminder.heading === heading
                ? { ...reminder, isCompleted: true }
                : reminder
        )
    );
  };
  const handleDeletion = (heading) => {
    setReminders(prevReminder =>
    prevReminder.filter(item => heading !== item.heading)
    )
  }
  const handleSave = () => {
    const newReminder = {
      heading: reminderHeading,
      description: reminderDescription,
      time: time.toLocaleTimeString(),
    };
    setReminders([...reminders, newReminder]);
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setReminderHeading("");
    setReminderDescription("");
    setTime(new Date());
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.sub_container_c}>
        <Text style={Styles.form_heading}>Reminders</Text>
      </View>
      <View style={Styles.sub_container_b}>
        <ScrollView
          contentContainerStyle={[Styles.scrollContainer, { marginTop: 20 }]}
        >
          {reminders.map((item, index) => (
              !item.isCompleted &&
            <ReminderCardView
              key={index} // Add a key to each element in the map
              heading={item.heading}
              subText_a={item.description}
              subText_b={item.time}
              onComplete={() => handleCompletion(item.heading)}
              onDelete={() => handleDeletion(item.heading)}
              iconPath_major={require("../assets/icons/notification-bell.png")}
              iconPath_a={require("../assets/icons/check.png")}
              iconPath_b={require("../assets/icons/bin.png")}
            />
          ))}
          <Button text={"Add Reminder"} onPress={() => setModalVisible(true)} />
        </ScrollView>
      </View>

      <AddReminderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        reminderHeading={reminderHeading}
        setReminderHeading={setReminderHeading}
        reminderDescription={reminderDescription}
        setReminderDescription={setReminderDescription}
        time={time}
        setTime={setTime}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
        setReminders={setReminders}
        handleSave={handleSave}
        resetForm={resetForm}
      />
    </View>
  );
}
