import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import React from "react";

export default function Workouts(){
    return(
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Workouts</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                {/*   Workout Plans CardViews*/}
                </ScrollView>
            </View>
        </View>
    )
}