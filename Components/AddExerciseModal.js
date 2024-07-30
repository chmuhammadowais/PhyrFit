import { Modal, Text, View } from "react-native";
import Styles from "../assets/Styles";
import React from "react";
import CheckBox from "./Checkbox";
import Button from "./Button";

export default function AddExerciseModal({ modalVisible, setModalVisible, exercises, toggleExerciseChecked }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={Styles.centeredView}>
                <View style={Styles.modalView}>
                    <Text style={[Styles.cardViewHeading, { marginBottom: 30 }]}>Select Exercises:</Text>
                    {
                        exercises.map((item, index) => (
                            <CheckBox
                                text={item.label}
                                key={item.label}
                                onValueChange={() => toggleExerciseChecked(index)}
                                value={item.isChecked}
                            />
                        ))
                    }
                    <Button text={"Done"} onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    )
}
