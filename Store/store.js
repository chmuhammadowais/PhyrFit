import React, { createContext, useState, useEffect, useCallback } from "react";
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
  handleWorkoutCompletion: (workoutId) => {},
  handleWorkoutIncompletion: (workoutId) => {},
  userWorkouts: [],
  workoutStatuses: [],
  handleDelete: (workoutId) => {},
  fetchWorkouts: () => {},
  fetchWorkoutStatuses: () => {},
});

const API_BASE_URL = "http://192.168.0.105:3000"; // Consider using an environment variable for this

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
  const [workoutStatuses, setWorkoutStatuses] = useState([]);

  const addUser = useCallback((userData) => setUser(userData), []);

  const removeUser = useCallback(() => {
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
  }, []);

  const resetData = useCallback(() => {
    removeUser();
    setUserWorkouts([]);
    setWorkoutStatuses([]);
  }, [removeUser]);

  const fetchWorkouts = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/workouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setUserWorkouts(data.workouts);
      } else {
        console.error("Failed to fetch workouts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchWorkouts();
      fetchWorkoutStatuses();
    }
  }, [token, fetchWorkouts, fetchWorkoutStatuses]);

  const handleSave = useCallback(
    async (workoutData, editIndex) => {
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
          const workoutId = userWorkouts[editIndex].id;
          response = await fetch(
            `${API_BASE_URL}/users/workouts/${workoutId}`,
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
          response = await fetch(`${API_BASE_URL}/users/workouts`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newWorkout),
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          fetchWorkouts();
        } else {
          throw new Error(data.message || "Failed to save workout");
        }
      } catch (error) {
        console.error("Error saving workout:", error);
        Alert.alert("Error", "Failed to save workout. Please try again.");
      }
    },
    [token, userWorkouts, fetchWorkouts]
  );

  const handleDelete = useCallback(
    async (workoutId) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/users/workouts/${workoutId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          fetchWorkouts();
        } else {
          throw new Error(data.message || "Failed to delete workout");
        }
      } catch (error) {
        console.error("Error deleting workout:", error);
        Alert.alert("Error", "Failed to delete workout. Please try again.");
      }
    },
    [token, fetchWorkouts]
  );

  const handleWorkoutCompletion = useCallback(
    async (workoutId) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/users/workoutCompletionRecord`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              workoutId,
              date: new Date().toISOString().split("T")[0],
              isCompleted: true,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setUserWorkouts((prev) =>
            prev.map((workout) =>
              workout.id === workoutId
                ? { ...workout, isCompleted: true }
                : workout
            )
          );
          fetchWorkoutStatuses();
        } else {
          console.error("Failed to mark workout as complete:", data.message);
        }
      } catch (error) {
        console.error("Error marking workout as complete:", error);
      }
    },
    [token, fetchWorkoutStatuses, user.id]
  );

  const handleWorkoutIncompletion = useCallback(
    async (workoutId) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/users/workoutCompletionRecord`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              workoutId,
              date: new Date().toISOString().split("T")[0],
              isCompleted: false,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setUserWorkouts((prev) =>
            prev.map((workout) =>
              workout.id === workoutId
                ? { ...workout, isCompleted: false }
                : workout
            )
          );
          fetchWorkoutStatuses();
        } else {
          console.error("Failed to mark workout as incomplete:", data.message);
        }
      } catch (error) {
        console.error("Error marking workout as incomplete:", error);
      }
    },
    [token, fetchWorkoutStatuses, user.id]
  );

  // Update fetchWorkoutStatuses to use the new structure
  const fetchWorkoutStatuses = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/workoutStatus/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setWorkoutStatuses(data.statuses);
      } else {
        console.error("Failed to fetch workout statuses:", data.message);
      }
    } catch (error) {
      console.error("Error fetching workout statuses:", error);
    }
  }, [token, user.id]);
  const value = {
    user,
    token,
    addUser,
    setToken,
    removeUser,
    resetData,
    userWorkouts,
    workoutStatuses,
    handleSave,
    handleWorkoutCompletion,
    handleWorkoutIncompletion,
    handleDelete,
    fetchWorkouts,
    fetchWorkoutStatuses,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
