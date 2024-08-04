import { ScrollView, Text, View } from "react-native";
import Styles from "../assets/Styles";
import BasicCardView from "../Components/BasicCardView";
import React, { useContext, useEffect, useState } from "react";
import AchievementsCardView from "../Components/AchievementsCardView";
import QuoteCardView from "../Components/QuoteCardView";
import MyMotivationCardView from "../Components/MyMotivationCardView";
import { UserContext } from "../Store/store";

export default function Home() {
  const { userWorkouts, handleWorkoutCompletion, handleWorkoutIncompletion } =
    useContext(UserContext);

  const today = new Date().getDay(); // Get today's day as a number (0 for Sunday, 1 for Monday, etc.)
  const [todayFocus, setTodayFocus] = useState([]);
  const [tempIsCompleted, setTempIsCompleted] = useState(null);
  const totalWorkoutDays = userWorkouts.length;
  const completedWorkoutDays = userWorkouts.filter(
    (item) => item.isCompleted === true
  );

  useEffect(() => {
    const todayWorkouts = userWorkouts.filter((item) => item.day === today);
    setTodayFocus(todayWorkouts);
    setTempIsCompleted(
      todayWorkouts.length > 0 ? todayWorkouts[0].isCompleted : ""
    );
  }, [userWorkouts, today]);

  const completeWorkout = () => {
    handleWorkoutCompletion(today);
    setTempIsCompleted(true); // Update the temp state immediately
  };

  const incompleteWorkout = () => {
    handleWorkoutIncompletion(today);
    setTempIsCompleted(false); // Update the temp state immediately
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
            completedWorkoutDays={completedWorkoutDays.length}
          />
          <QuoteCardView />
          <MyMotivationCardView />
        </ScrollView>
      </View>
    </View>
  );
}
