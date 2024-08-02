import {Image, Text, View} from "react-native";
import {Colors} from "../assets/colors/colors";
import Styles from "../assets/Styles";
import {LinearGradient} from "expo-linear-gradient";
import ProgressBar from "./ProgressBar";

export default function AchievementsCardView({totalWorkoutDays, completedWorkoutDays}) {
    return(
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <Text style={Styles.cardViewHeading}>Achievements</Text>
                <Image style={Styles.iconSmall} source={require("../assets/icons/trophy.png")} />
            </View>

            <Text style={[Styles.cardViewText, {marginBottom: 5}]}>Weekly Progress</Text>
            <ProgressBar fillPercentage={completedWorkoutDays && totalWorkoutDays ? Math.floor((completedWorkoutDays / totalWorkoutDays * 100)) : 0}/>
            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%', marginTop: 5}]}>
                <View>
                    <Text style={Styles.cardViewText}>Total Workout Days: {totalWorkoutDays}</Text>
                    <Text style={Styles.cardViewText}>Completed Workout Days: {completedWorkoutDays}</Text>
                </View>
            </View>
        </LinearGradient>
    )
}