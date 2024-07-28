import {KeyboardAvoidingView, Modal, Platform, Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";
import Button from "./Button";
import InputField from "./InputField";
import OptionsPicker from "./OptionsPicker";

export default function AddWorkoutModal(
    {
        trainingDayName,
        setTrainingDayName,
        setCount,
        setSetCount,
        repCount,
        setRepCount,
        items,
        selectedItem, setSelectedItem,
        modalVisible,
        setModalVisible,
        handleSave}){

    return(
     <Modal
         animationType={"slide"}
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => setModalVisible(false)}>
         <KeyboardAvoidingView
             style={Styles.centeredView}
             behavior={Platform.OS === "ios" ? "padding" : null}
             keyboardVerticalOffset={30}>
             <View
                 style={Styles.modalView}>
                 <Text style={[Styles.cardViewHeading, {marginBottom: 30}]}>Add Workout</Text>
                 <InputField placeholder={"Training Day Name"} text={trainingDayName} setText={setTrainingDayName}/>
                 <View style={Styles.sub_container_horizontal}>
                     <InputField placeholder={'Sets'} secureTextEntry={false} keyboardType={'number'} width={'48%'} text={setCount} setText={setSetCount}/>
                     <InputField placeholder={'Reps'} secureTextEntry={false} keyboardType={'number'} width={'48%'} text={repCount} setText={setRepCount}/>
                 </View>
                 <OptionsPicker items={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                 <Button text={"Add Exercises"} />
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
     </Modal>

 )
}