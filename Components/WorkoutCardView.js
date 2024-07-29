import { Colors } from "../assets/colors/colors";
import Styles from "../assets/Styles";
import { Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "./Button";

export default function WorkoutCardView({ workout_name, setCount, repCount, totalExercises, handleEdit, handleDelete }) {
    return (
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[Styles.cardViewContainer, { padding: 7 }]}
        >
            {/* Horizontal view */}
            <View style={[Styles.sub_container_horizontal, { width: '95%' }]}>
                <Text style={[Styles.cardViewHeading, { fontSize: 24 }]}>{workout_name}</Text>
            </View>

            {/* Horizontal view */}
            <View style={[Styles.sub_container_horizontal, { width: '95%' }]}>
                <View style={{ justifyContent: "flex-end" }}>
                    <Text style={[Styles.cardViewText, { fontSize: 16, fontFamily: "roboto_light" }]}>{`Total Exercises ${totalExercises}`}</Text>
                    <Text style={[Styles.cardViewText, { fontSize: 16, fontFamily: "roboto_light" }]}>{`Exercise Sets: ${setCount} X ${repCount}`}</Text>
                </View>
                <Image style={Styles.iconLarge} source={
                    workout_name.toLowerCase() === "chest day" || workout_name.toLowerCase() === "push day" ? require('../assets/icons/chest-day-white.png') :
                        workout_name.toLowerCase() === "back day" || workout_name.toLowerCase() === "pull day" ? require("../assets/icons/back-day-white.png") :
                            workout_name.toLowerCase() === "leg day" ? require("../assets/icons/leg-day-white.png") :
                                workout_name.toLowerCase() === "arms day" ? require("../assets/icons/arm-day-white.png") :
                                    workout_name.toLowerCase() === "cardio day" ? require("../assets/icons/cardio-day-white.png") :
                                        workout_name.toLowerCase() === "shoulder day" ? require("../assets/icons/shoulder-day-white.png") :
                                            require("../assets/icons/workout-white.png")} />
                                                </View>

                    <View style={[Styles.sub_container_horizontal, { width: '95%' }]}>
                    <Button text={"Edit"} customStyle={{ width: '35%', height: 35 }} textStyle={{ fontSize: 18 }} onPress={handleEdit} />
                    <Button text={"Delete"} customStyle={{ width: '35%', height: 35 }} textStyle={{ fontSize: 18 }} onPress={handleDelete} />
            </View>
        </LinearGradient>
);
}