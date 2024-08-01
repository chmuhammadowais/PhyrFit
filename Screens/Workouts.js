import { ScrollView, Text, View } from "react-native";
import Styles from "../assets/Styles";
import React, { useContext, useState } from "react";
import WorkoutCardView from "../Components/WorkoutCardView";
import Button from "../Components/Button";
import AddWorkoutModal from "../Components/AddWorkoutModal";
import { UserContext } from "../Store/store";

export default function Workouts() {
    const { userWorkouts, handleSave, setUserWorkouts } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const addWorkout = () => {
        setEditIndex(null);
        setModalVisible(true);
    };

    const handleEdit = (item, index) => {
        setEditIndex(index);
        setModalVisible(true);
    };

    const handleDelete = (item) => {
        setUserWorkouts(userWorkouts.filter(workout => workout.name !== item.name));
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Workouts</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, { marginTop: 20 }]}>
                    {userWorkouts.length > 0 ? (
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
                    ) : (
                        <Text style={Styles.loading_text}>No Workouts</Text>
                    )}
                    <Button text={"Add Workout"} customStyle={{ marginBottom: 30 }} onPress={addWorkout} />
                    {modalVisible && (
                        <AddWorkoutModal
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            editIndex={editIndex}
                            handleSave={handleSave}
                        />
                    )}
                </ScrollView>
            </View>
        </View>
    );
}
