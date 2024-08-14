import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";

export const UserContext = createContext({
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  },
  token: "",
  addUser: (userData) => {},
  setToken: (token) => {},
  removeUser: () => {},
  resetData: () => {},
  handleSave: (workoutData, editIndex) => {},
  handleWorkoutCompletion: (day) => {},
  handleWorkoutIncompletion: (day) => {},
  userWorkouts: [],
  handleDelete: (workoutId) => {},
  fetchWorkouts: () => {},
});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  });
  const [token, setToken] = useState("");
  const [userWorkouts, setUserWorkouts] = useState([]);

  const addUser = (userData) => setUser(userData);

  const removeUser = () => {
    setUser({
      id: 0,
      name: "",
      email: "",
      phone: "",
      age: "",
      height: "",
      weight: "",
      goal: "",
    });
    setToken(""); // Clear token when user is removed
  };

  const resetData = () => {
    setUser({
      id: 0,
      name: "",
      email: "",
      phone: "",
      age: "",
      height: "",
      weight: "",
      goal: "",
    });
    setToken("");
    setUserWorkouts([]);
  };

  // Function to fetch workouts from the server
  const fetchWorkouts = async () => {
    try {
      const response = await fetch("http://192.168.0.106:3000/users/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserWorkouts(data.workouts);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // Fetch workouts when the component mounts or when the token changes
  useEffect(() => {
    if (token) {
      fetchWorkouts();
    }
  }, [token]);

  const handleSave = async (workoutData, editIndex) => {
    const { trainingDayName, selectedItem, exercises, repCount, setCount } =
      workoutData;

    if (trainingDayName === "" || selectedItem === "") {
      Alert.alert("Error", "Workout name and day cannot be empty.");
      return;
    }

    const selectedExercises = exercises.filter(
      (exercise) => exercise.isChecked
    );

    const newWorkout = {
      name: trainingDayName,
      day: selectedItem,
      setCount,
      repCount,
      exercises: selectedExercises,
      isCompleted: null,
    };

    try {
      let response;
      if (editIndex !== null) {
        // Update existing workout
        const workoutId = userWorkouts[editIndex].id;
        response = await fetch(
          `http://192.168.0.106:3000/users/workouts/${workoutId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newWorkout),
          }
        );
      } else {
        // Add new workout
        response = await fetch("http://192.168.0.106:3000/users/workouts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWorkout),
        });
      }

      const data = await response.json();
      if (data.success) {
        // Fetch updated workouts
        fetchWorkouts();
      } else {
        throw new Error(data.message || "Failed to save workout");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      Alert.alert("Error", "Failed to save workout. Please try again.");
    }
  };

  const handleDelete = async (workoutId) => {
    try {
      const response = await fetch(
        `http://192.168.0.106:3000/users/workouts/${workoutId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        // Fetch updated workouts
        fetchWorkouts();
      } else {
        throw new Error(data.message || "Failed to delete workout");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
      Alert.alert("Error", "Failed to delete workout. Please try again.");
    }
  };

  const handleWorkoutCompletion = (day) => {
    setUserWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.day === day ? { ...workout, isCompleted: true } : workout
      )
    );
  };

  const handleWorkoutIncompletion = (day) => {
    setUserWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.day === day ? { ...workout, isCompleted: false } : workout
      )
    );
  };

  const value = {
    user,
    token,
    addUser,
    setToken,
    removeUser,
    resetData,
    userWorkouts,
    handleSave,
    handleWorkoutCompletion,
    handleWorkoutIncompletion,
    handleDelete,
    fetchWorkouts,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
