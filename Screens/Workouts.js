import { Alert, ScrollView, Text, View } from "react-native";
import Styles from "../assets/Styles";
import React, { useEffect, useState } from "react";
import WorkoutCardView from "../Components/WorkoutCardView";
import Button from "../Components/Button";
import AddWorkoutModal from "../Components/AddWorkoutModal";

export default function Workouts() {
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
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" }
    ];

    const initialExercises = [
        { label: "Push-ups", isChecked: false },
        { label: "Burpees", isChecked: false },
        { label: "Planks", isChecked: false },
        { label: "Mountain Climbers", isChecked: false },
        { label: "Leg Raises", isChecked: false }
    ];

    const [trainingDayName, setTrainingDayName] = useState("");
    const [setCount, setSetCount] = useState("");
    const [repCount, setRepCount] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [exercises, setExercises] = useState(initialExercises);
    const [editIndex, setEditIndex] = useState(null); // New state to keep track of editing index

    useEffect(() => {
        console.log("Exercises updated:", exercises);
    }, [exercises]);

    function handleSave() {
        if (trainingDayName === "" || selectedItem === "") {
            Alert.alert("Error", "Workout name and day cannot be empty.");
            return;
        }

        const duplicateCheck = userWorkouts.some(
            (item, index) =>
                item.name === trainingDayName &&
                item.day === selectedItem &&
                index !== editIndex // Check for duplicates excluding the edited item
        );

        if (duplicateCheck) {
            Alert.alert("Error", "Duplicate workout detected.");
            return;
        }

        const selectedExercises = exercises.filter(exercise => exercise.isChecked);

        const newWorkout = {
            name: trainingDayName,
            day: selectedItem,
            setCount: setCount,
            repCount: repCount,
            exercises: selectedExercises
        };

        if (editIndex !== null) {
            const updatedWorkouts = [...userWorkouts];
            updatedWorkouts[editIndex] = newWorkout;
            setUserWorkouts(updatedWorkouts);
        } else {
            setUserWorkouts([...userWorkouts, newWorkout]);
        }

        setModalVisible(false);
        clearForm();
    }

    function clearForm() {
        setTrainingDayName("");
        setSetCount("");
        setRepCount("");
        setSelectedItem("");
        setExercises(initialExercises.map(exercise => ({ ...exercise, isChecked: false })));
        setEditIndex(null); // Clear edit index
    }

    function handleEdit(item, index) {
        setModalVisible(true);
        setTrainingDayName(item.name);
        setSetCount(item.setCount);
        setRepCount(item.repCount);
        setSelectedItem(item.day);
        setExercises(initialExercises.map(exercise => ({
            ...exercise,
            isChecked: item.exercises.some(ex => ex.label === exercise.label)
        })));
        setEditIndex(index);
    }

    function handleDelete(item) {
        setUserWorkouts(userWorkouts.filter(workout => workout.name !== item.name));
    }

    function addWorkout() {
        clearForm();
        setModalVisible(true);
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Workouts</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, { marginTop: 20 }]}>
                    {
                        userWorkouts.map((item, index) => (
                            <WorkoutCardView
                                key={item.name + item.day}
                                workout_name={item.name}
                                setCount={item.setCount}
                                repCount={item.repCount}
                                totalExercises={item.exercises.length}
                                handleEdit={() => handleEdit(item, index)}
                                handleDelete={() => handleDelete(item)}
                            />
                        ))
                    }
                    <Button text={"Add Workout"} customStyle={{ marginBottom: 30 }} onPress={addWorkout} />
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
                        exercises={exercises}
                        setExercises={setExercises}
                        handleSave={handleSave}
                    />
                </ScrollView>
            </View>
        </View>
    );
}
