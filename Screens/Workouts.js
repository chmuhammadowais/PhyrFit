import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import React from "react";
import WorkoutCardView from "../Components/WorkoutCardView";
import Button from "../Components/Button";

export default function Workouts(){
    const user_workouts = [
        {
            name: "Shoulder day",
            day: "Wednesday",
            time: "02:00 pm",
            setCount: "3",
            repCount: "12",
            exercises: []
        }
    ]
    return(
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Workouts</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                {/*   Workout Plans CardViews*/}
                    {
                        user_workouts.map((item) => <WorkoutCardView workout_name={item.name} setCount={item.setCount} repCount={item.repCount} totalExercises={item.exercises.length} key={item.name}/> )
                    }
                    <Button text={"Add Workout"} />
                </ScrollView>
            </View>
        </View>
    )
}