import React, { useContext, useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Styles from "../assets/Styles";
import WorkoutCardView from "../Components/WorkoutCardView";
import Button from "../Components/Button";
import AddWorkoutModal from "../Components/AddWorkoutModal";
import { UserContext } from "../Store/store";

export default function Workouts() {
  const { userWorkouts, handleSave, handleDelete, fetchWorkouts } =
    useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const addWorkout = () => {
    setEditIndex(null);
    setModalVisible(true);
  };

  const handleEdit = (item, index) => {
    setEditIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.sub_container_c}>
        <Text style={Styles.form_heading}>Workouts</Text>
      </View>
      <View style={Styles.sub_container_b}>
        <ScrollView
          contentContainerStyle={[Styles.scrollContainer, { marginTop: 20 }]}
        >
          {userWorkouts.length > 0 ? (
            userWorkouts.map((item, index) => (
              <WorkoutCardView
                key={item.id}
                workout_name={item.name}
                setCount={item.setCount}
                repCount={item.repCount}
                totalExercises={item.exercises.length}
                handleEdit={() => handleEdit(item, index)}
                handleDelete={() => handleDelete(item.id)}
              />
            ))
          ) : (
            <Text style={Styles.loading_text}>No Workouts</Text>
          )}
          <Button
            text={"Add Workout"}
            customStyle={{ marginBottom: 30 }}
            onPress={addWorkout}
          />
          {modalVisible && (
            <AddWorkoutModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              editIndex={editIndex}
              handleSave={handleSave}
              initialWorkout={
                editIndex !== null ? userWorkouts[editIndex] : null
              }
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}
