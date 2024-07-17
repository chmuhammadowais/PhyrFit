import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import TodayCardView from "../Components/TodayCardView";
import React from "react";
import AchievementsCardView from "../Components/AchievementsCardView";
import QuoteCardView from "../Components/QuoteCardView";
import MyMotivationCardView from "../Components/MyMotivationCardView";

export default function Home(){
    return(
        <View style={Styles.container}>
          <View style={Styles.sub_container_c}>
              <Text style={Styles.form_heading}>Summary</Text>
          </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                    <TodayCardView />
                    <AchievementsCardView/>
                    <QuoteCardView text={"Hello World"} />
                    <MyMotivationCardView />
                </ScrollView>
            </View>
        </View>
    )
}