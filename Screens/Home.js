import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import InputField from "../Components/InputField";
import CardView from "../Components/CardView";
import React from "react";

export default function Home(){
    return(
        <View style={Styles.container}>
          <View style={Styles.sub_container_c}>
              <Text style={Styles.form_heading}>Summary</Text>
          </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                       <CardView />
                </ScrollView>
            </View>
        </View>
    )
}