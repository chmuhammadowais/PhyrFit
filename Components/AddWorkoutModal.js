import { KeyboardAvoidingView, Modal, Platform, Text, View } from "react-native";
import React, { useState } from "react";
import Styles from "../assets/Styles";
import Button from "./Button";
import InputField from "./InputField";
import OptionsPicker from "./OptionsPicker";
import AddExerciseModal from "./AddExerciseModal";

export default function AddWorkoutModal({
                                            trainingDayName,
                                            setTrainingDayName,
                                            setCount,
                                            setSetCount,
                                            repCount,
                                            setRepCount,
                                            items,
                                            selectedItem,
                                            setSelectedItem,
                                            exercises,
                                            setExercises,
                                            modalVisible,
                                            setModalVisible,
                                            handleSave
                                        }) {
    const [modalVisibleEx, setModalVisibleEx] = useState(false);

    function toggleExerciseChecked(index) {
        setExercises(prevExercises => {
            const newExercises = prevExercises.map((exercise, i) => {
                if (i === index) {
                    return { ...exercise, isChecked: !exercise.isChecked };
                }
                return exercise;
            });
            console.log("Updated Exercises:", newExercises);
            return newExercises;
        });
    }

    return (
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <KeyboardAvoidingView
                style={Styles.centeredView}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={30}>
                <View style={Styles.modalView}>
                    <Text style={[Styles.cardViewHeading, { marginBottom: 30 }]}>Add Workout</Text>
                    <InputField placeholder={"Training Day Name"} text={trainingDayName} setText={setTrainingDayName} />
                    <View style={Styles.sub_container_horizontal}>
                        <InputField placeholder={'Sets'} secureTextEntry={false} keyboardType={'number'} width={'48%'} text={setCount} setText={setSetCount} />
                        <InputField placeholder={'Reps'} secureTextEntry={false} keyboardType={'number'} width={'48%'} text={repCount} setText={setRepCount} />
                    </View>
                    <OptionsPicker items={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                    <Button text={"Add Exercises"} onPress={() => setModalVisibleEx(true)} />
                    <View style={Styles.sub_container_horizontal}>
                        <Button
                            text="Save"
                            onPress={() => handleSave()}
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
            <AddExerciseModal
                modalVisible={modalVisibleEx}
                setModalVisible={setModalVisibleEx}
                exercises={exercises}
                toggleExerciseChecked={toggleExerciseChecked}
            />
        </Modal>
    )
}
