import {Image, Text, View} from "react-native";
import Styles from "../assets/Styles";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../assets/colors/colors";

export default function QuoteCardView({text}){
    return(
        //vertical view
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <Text style={Styles.cardViewHeading}>Quote of The Day</Text>
                <Image style={Styles.iconSmall} source={require('../assets/icons/quote.png')} />
            </View>

            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <View>
                    <Text style={Styles.cardViewText}>{text ? text : "Error loading the quote."}</Text>
                </View>
            </View>
        </LinearGradient>
    )
}