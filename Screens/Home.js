import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Styles from "../assets/Styles";
import BasicCardView from "../Components/BasicCardView";
import AchievementsCardView from "../Components/AchievementsCardView";
import QuoteCardView from "../Components/QuoteCardView";
import MyMotivationCardView from "../Components/MyMotivationCardView";
import { UserContext } from "../Store/store";

export default function Home() {
  const {
    userWorkouts,
    workoutStatuses,
    handleWorkoutCompletion,
    handleWorkoutIncompletion,
    fetchWorkoutStatuses,
    user,
  } = useContext(UserContext);

  const [todayFocus, setTodayFocus] = useState([]);
  const [tempIsCompleted, setTempIsCompleted] = useState(null);

  const totalWorkoutDays = userWorkouts.length;
  const completedWorkoutDays = workoutStatuses.filter(
    (status) => status.isCompleted
  ).length;

  const today = new Date().getDay();
  const todayString = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchWorkoutStatuses();
  }, [fetchWorkoutStatuses]);

  useEffect(() => {
    const todayWorkouts = userWorkouts.filter((item) => item.day === today);
    setTodayFocus(todayWorkouts);

    if (todayWorkouts.length > 0) {
      const todayStatus = workoutStatuses.find(
        (status) =>
          status.date === todayString &&
          status.workoutId === todayWorkouts[0].id
      );
      setTempIsCompleted(todayStatus ? todayStatus.isCompleted : null);
    } else {
      setTempIsCompleted(null);
    }
  }, [userWorkouts, workoutStatuses, today, todayString]);

  const completeWorkout = () => {
    if (todayFocus.length > 0) {
      handleWorkoutCompletion(todayFocus[0].id);
      setTempIsCompleted(true);
    }
  };

  const incompleteWorkout = () => {
    if (todayFocus.length > 0) {
      handleWorkoutIncompletion(todayFocus[0].id);
      setTempIsCompleted(false);
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.sub_container_c}>
        <Text style={Styles.form_heading}>Summary</Text>
      </View>
      <View style={Styles.sub_container_b}>
        <ScrollView
          contentContainerStyle={[Styles.scrollContainer, { marginTop: 20 }]}
        >
          <BasicCardView
            heading={"Today's Focus"}
            subText_a={`Today: ${
              todayFocus.length === 0 ? "Rest Day" : todayFocus[0].name
            }`}
            subText_b={`${
              todayFocus.length === 0
                ? "Rest is the sweet sauce of labor"
                : "Nothing worth having comes easy."
            }`}
            tempIsCompleted={tempIsCompleted}
            onComplete={completeWorkout}
            onIncomplete={incompleteWorkout}
            iconPath_major={require("../assets/icons/exercise.png")}
            iconPath_a={require("../assets/icons/complete.png")}
            iconPath_b={require("../assets/icons/incomplete.png")}
          />
          <AchievementsCardView
            totalWorkoutDays={totalWorkoutDays}
            completedWorkoutDays={completedWorkoutDays}
          />
          <QuoteCardView />
          <MyMotivationCardView />
        </ScrollView>
      </View>
    </View>
  );
}
