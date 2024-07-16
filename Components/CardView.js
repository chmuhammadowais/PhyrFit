import {Image, Text, View} from "react-native";
import Styles from "../assets/Styles";
import CircularButton from "./CircularButton";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../assets/colors/colors";

export default function CardView(){
    return(
        //vertical view
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <Text style={Styles.cardViewHeading}>Today's Focus</Text>
                <Image style={Styles.iconSmall} source={require("../assets/icons/exercise.png")} />
            </View>

            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <View>
                    <Text style={Styles.cardViewText}>Today's Focus: Chest</Text>
                    <Text style={Styles.cardViewText}>Reminder: 10:00 am</Text>
                </View>

                <View style={[Styles.sub_container_horizontal, {width: "auto"}]}>
                   <CircularButton source={require('../assets/icons/complete.png')}/>
                    <CircularButton source={require('../assets/icons/incomplete.png')}/>
                </View>

            </View>
        </LinearGradient>
    )
}