import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../assets/Styles";
import Button from "./Button";
import InputField from "./InputField";
import OptionsPicker from "./OptionsPicker";
import AddExerciseModal from "./AddExerciseModal";

const initialExercises = [
  { label: "Push-ups", isChecked: false },
  { label: "Burpees", isChecked: false },
  { label: "Planks", isChecked: false },
  { label: "Mountain Climbers", isChecked: false },
  { label: "Leg Raises", isChecked: false },
];

const days = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export default function AddWorkoutModal({
  modalVisible,
  setModalVisible,
  editIndex,
  handleSave,
  initialWorkout,
}) {
  const [trainingDayName, setTrainingDayName] = useState("");
  const [setCount, setSetCount] = useState("");
  const [repCount, setRepCount] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);
  const [exercises, setExercises] = useState(initialExercises);
  const [modalVisibleEx, setModalVisibleEx] = useState(false);

  useEffect(() => {
    if (initialWorkout) {
      setTrainingDayName(initialWorkout.name);
      setSetCount(initialWorkout.setCount.toString()); // Convert to string
      setRepCount(initialWorkout.repCount.toString()); // Convert to string
      setSelectedItem(initialWorkout.day);
      setExercises(
        initialExercises.map((exercise) => ({
          ...exercise,
          isChecked: initialWorkout.exercises.some(
            (ex) => ex.label === exercise.label
          ),
        }))
      );
    } else {
      clearForm();
    }
  }, [initialWorkout]);

  const toggleExerciseChecked = (index) => {
    setExercises((prevExercises) => {
      return prevExercises.map((exercise, i) => {
        if (i === index) {
          return { ...exercise, isChecked: !exercise.isChecked };
        }
        return exercise;
      });
    });
  };

  const clearForm = () => {
    setTrainingDayName("");
    setSetCount("");
    setRepCount("");
    setSelectedItem(0);
    setExercises(
      initialExercises.map((exercise) => ({ ...exercise, isChecked: false }))
    );
  };

  const saveWorkout = () => {
    handleSave(
      {
        trainingDayName,
        selectedItem,
        exercises,
        repCount,
        setCount,
      },
      editIndex
    );
    setModalVisible(false);
    clearForm();
  };

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
        style={Styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={30}
      >
        <View style={Styles.modalView}>
          <Text style={[Styles.cardViewHeading, { marginBottom: 30 }]}>
            Add Workout
          </Text>
          <InputField
            placeholder={"Training Day Name"}
            text={trainingDayName}
            setText={setTrainingDayName}
          />
          <View style={Styles.sub_container_horizontal}>
            <InputField
              placeholder={"Sets"}
              secureTextEntry={false}
              keyboardType={"decimal-pad"}
              width={"48%"}
              text={setCount}
              setText={setSetCount}
            />
            <InputField
              placeholder={"Reps"}
              secureTextEntry={false}
              keyboardType={"decimal-pad"}
              width={"48%"}
              text={repCount}
              setText={setRepCount}
            />
          </View>
          <OptionsPicker
            items={days}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <Button
            text={"Select Exercises"}
            customStyle={{ marginVertical: 10 }}
            onPress={() => setModalVisibleEx(true)}
          />
          <AddExerciseModal
            modalVisible={modalVisibleEx}
            setModalVisible={setModalVisibleEx}
            exercises={exercises}
            toggleExerciseChecked={toggleExerciseChecked}
          />
          <View
            style={[
              Styles.sub_container_horizontal,
              { justifyContent: "center", gap: 5 },
            ]}
          >
            <Button
              text={"Save Workout"}
              onPress={saveWorkout}
              customStyle={{ width: "55%" }}
            />
            <Button
              text={"Cancel"}
              onPress={() => setModalVisible(false)}
              customStyle={{ width: "55%" }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
