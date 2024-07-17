import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import React from "react";
import CircularButton from "../Components/CircularButton";
import {Colors} from "../assets/colors/colors";
import BasicCardView from "../Components/BasicCardView";

export default function Reminders(){
    return(
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Reminders</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                    <BasicCardView
                        heading={"Workout"}
                        subText_a={"Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        subText_b={"Reminder: 12:00 am"}
                        iconPath_major={require("../assets/icons/notification-bell.png")}
                        iconPath_a={require('../assets/icons/check.png')}
                        iconPath_b={require('../assets/icons/bin.png')}/>

                    <CircularButton source={require("../assets/icons/add reminder.png")} imageStyle={{width: 40, height: 40}} containerStyle={{alignSelf: "center", backgroundColor: Colors.ButtonColor, width: 60, height: 60, justifyContent: "center",alignItems: "center", borderRadius:50, marginBottom: 30, marginTop: 10}}/>
                </ScrollView>
            </View>
        </View>
    )
}