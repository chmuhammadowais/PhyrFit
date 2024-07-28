import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import React, {useState} from "react";
import WorkoutCardView from "../Components/WorkoutCardView";
import Button from "../Components/Button";
import AddWorkoutModal from "../Components/AddWorkoutModal";

export default function Workouts(){
    const [userWorkouts, setUserWorkouts] = useState([
        {
            name: "Shoulder day",
            day: "Wednesday",
            setCount: "3",
            repCount: "12",
            exercises: []
        }
    ]);
    const items = [
        {
            label: "Monday",
            value: "monday"
        },
        {
            label: "Tuesday",
            value: "tuesday"
        },
        {
            label: "Wednesday",
            value: "wednesday"
        },
        {
            label: "Thursday",
            value: "thursday"
        },
        {
            label: "Friday",
            value: "friday"
        },
        {
            label: "Saturday",
            value: "saturday"
        },
        {
            label: "Sunday",
            value: "sunday"
        }]
    const [trainingDayName, setTrainingDayName] = useState("");
    const [setCount, setSetCount] = useState("");
    const [repCount, setRepCount] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    function handleSave(){
        const newWorkout = {
            name: trainingDayName,
            day: selectedItem,
            setCount: setCount,
            repCount: repCount,
            exercises: []
        };
        setUserWorkouts([...userWorkouts, newWorkout]);
        setModalVisible(false);
    }
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Workouts</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                {/*   Workout Plans CardViews*/}
                    {
                        userWorkouts.map((item) => <WorkoutCardView workout_name={item.name} setCount={item.setCount} repCount={item.repCount} totalExercises={item.exercises.length} key={item.name}/> )
                    }
                    <Button text={"Add Workout"} customStyle={{marginBottom: 30}} onPress={() => setModalVisible(true)}/>
                    <AddWorkoutModal
                        trainingDayName={trainingDayName}
                        setTrainingDayName={setTrainingDayName}
                        setCount={setCount}
                        setSetCount={setSetCount}
                        repCount={repCount}
                        setRepCount={setRepCount}
                        items={items}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    handleSave={handleSave}/>
                </ScrollView>
            </View>
        </View>
    )
}