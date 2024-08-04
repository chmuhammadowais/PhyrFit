import React, { createContext, useState } from 'react';
import { Alert } from "react-native";

export const UserContext = createContext({
    user: {
        name: "",
        email: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
        goal: ""
    },
    addUser: (userData) => {},
    removeUser: () => {},
    resetData: () => {},  // Add this line
    handleSave: (workoutData, editIndex) => {},
    handleWorkoutCompletion: (day) => {},
    handleWorkoutIncompletion: (day) => {},
});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
        goal: ""
    });
    const [userWorkouts, setUserWorkouts] = useState([]);

    const addUser = (userData) => setUser(userData);

    const removeUser = () => setUser({
        name: "",
        email: "",
        phone: "",
        age: "",
        height: "",
        weight: "",
        goal: ""
    });

    const resetData = () => {
        setUser({
            name: "",
            email: "",
            phone: "",
            age: "",
            height: "",
            weight: "",
            goal: ""
        });
        setUserWorkouts([]);
    };

    const handleSave = (workoutData, editIndex) => {
        const { trainingDayName, selectedItem, exercises, repCount, setCount } = workoutData;

        if (trainingDayName === "" || selectedItem === "") {
            Alert.alert("Error", "Workout name and day cannot be empty.");
            return;
        }

        const duplicateCheck = userWorkouts.some(
            (item, index) =>
                item.name === trainingDayName &&
                item.day === selectedItem &&
                index !== editIndex
        );

        if (duplicateCheck) {
            Alert.alert("Error", "Duplicate workout detected.");
            return;
        }

        const selectedExercises = exercises.filter(exercise => exercise.isChecked);

        const newWorkout = {
            name: trainingDayName,
            day: selectedItem,
            setCount,
            repCount,
            exercises: selectedExercises,
            isCompleted: null // Initialize as not completed
        };

        if (editIndex !== null) {
            const updatedWorkouts = [...userWorkouts];
            updatedWorkouts[editIndex] = newWorkout;
            setUserWorkouts(updatedWorkouts);
        } else {
            setUserWorkouts([...userWorkouts, newWorkout]);
        }
    };

    const handleWorkoutCompletion = (day) => {
        setUserWorkouts(prevWorkouts =>
            prevWorkouts.map(workout =>
                workout.day === day ? { ...workout, isCompleted: true } : workout
            )
        );
    };

    const handleWorkoutIncompletion = (day) => {
        setUserWorkouts(prevWorkouts =>
            prevWorkouts.map(workout =>
                workout.day === day ? { ...workout, isCompleted: false } : workout
            )
        );
    };

    const value = {
        user,
        addUser,
        removeUser,
        resetData,  // Add this line
        userWorkouts,
        handleSave,
        handleWorkoutCompletion,
        handleWorkoutIncompletion,
        setUserWorkouts
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
