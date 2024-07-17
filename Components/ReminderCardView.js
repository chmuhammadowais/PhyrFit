import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../assets/colors/colors";
import Styles from "../assets/Styles";
import {Image, Text, View} from "react-native";
import CircularButton from "./CircularButton";

export default function ReminderCardView({text}){
    return(
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <Text style={Styles.cardViewHeading}>Reminder Name</Text>
                <Image style={Styles.iconSmall} source={require("../assets/icons/notification-bell.png")} />
            </View>
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <View>
                    <Text style={Styles.cardViewText}>Description: lorem ipsum</Text>
                    <Text style={Styles.cardViewText}>Time: 12:00 am</Text>
                </View>

                <View style={[Styles.sub_container_horizontal, {width: "auto"}]}>
                    <CircularButton source={require('../assets/icons/check.png')}/>
                    <CircularButton source={require('../assets/icons/bin.png')}/>
                </View>
            </View>
        </LinearGradient>
    )
}