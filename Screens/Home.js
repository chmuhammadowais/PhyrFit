import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import BasicCardView from "../Components/BasicCardView";
import React, {useState} from "react";
import AchievementsCardView from "../Components/AchievementsCardView";
import QuoteCardView from "../Components/QuoteCardView";
import MyMotivationCardView from "../Components/MyMotivationCardView";

export default function Home(){
    const [todayFocus, setTodayFocus] = useState(null);
    console.log(todayFocus)
    return(
        <View style={Styles.container}>
          <View style={Styles.sub_container_c}>
              <Text style={Styles.form_heading}>Summary</Text>
          </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                    <BasicCardView
                        heading={"Today's Focus"}
                        subText_a={"Today's Focus: Chest"}
                        subText_b={"Reminder: 12:00 am"}
                        state={todayFocus}
                        setState={setTodayFocus}
                        iconPath_major={require("../assets/icons/exercise.png")}
                        iconPath_a={require('../assets/icons/complete.png')}
                        iconPath_b={require('../assets/icons/incomplete.png')}/>
                    <AchievementsCardView/>
                    <QuoteCardView />
                    <MyMotivationCardView />
                </ScrollView>
            </View>
        </View>
    )
}