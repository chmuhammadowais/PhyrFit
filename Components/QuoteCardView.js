import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../assets/colors/colors";
import Styles from "../assets/Styles";
import {Image, Text, View} from "react-native";
import ProgressBar from "./ProgressBar";

export default function QuoteCardView({text}){
    return(
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <Text style={Styles.cardViewHeading}>Quote Of The Day</Text>
                <Image style={Styles.iconSmall} source={require("../assets/icons/quote.png")} />
            </View>

            <Text style={[Styles.cardViewText, { alignSelf: "flex-start", paddingLeft: 10}]}>{text}</Text>

        </LinearGradient>
    )
}