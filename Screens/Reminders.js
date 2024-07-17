import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import TodayCardView from "../Components/TodayCardView";
import React from "react";
import AchievementsCardView from "../Components/AchievementsCardView";
import QuoteCardView from "../Components/QuoteCardView";
import MyMotivationCardView from "../Components/MyMotivationCardView";
import ReminderCardView from "../Components/ReminderCardView";
import CircularButton from "../Components/CircularButton";
import {Colors} from "../assets/colors/colors";

export default function Reminders(){
    return(
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Reminders</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                    <ReminderCardView />
                    <ReminderCardView />
                    <ReminderCardView />
                    <ReminderCardView />
                    <ReminderCardView />
                    <ReminderCardView />

                    <CircularButton source={require("../assets/icons/add reminder.png")} imageStyle={{width: 60, height: 60}} containerStyle={{alignSelf: "center", backgroundColor: Colors.ButtonColor, width: 90, height: 90, justifyContent: "center",alignItems: "center", borderRadius:50, marginBottom: 30}}/>
                </ScrollView>
            </View>
        </View>
    )
}