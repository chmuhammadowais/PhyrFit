import {Image, Text, View} from "react-native";
import Styles from "../assets/Styles";
import CircularButton from "./CircularButton";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../assets/colors/colors";

export default function BasicCardView({heading, subText_a, subText_b, iconPath_major, iconPath_a, iconPath_b}){
    return(
        //vertical view
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <Text style={Styles.cardViewHeading}>{heading}</Text>
                <Image style={Styles.iconSmall} source={iconPath_major} />
            </View>

            {/*Horizontal view*/}
            <View style={[Styles.sub_container_horizontal, {width: '95%'}]}>
                <View>
                    <Text style={Styles.cardViewText}>{subText_a.length < 40 ? subText_a : subText_a.substring(0, 40).concat('...')}</Text>
                    <Text style={Styles.cardViewText}>{subText_b.length < 40 ? subText_b : subText_b.substring(0, 40).concat('...')}</Text>
                </View>

                <View style={[Styles.sub_container_horizontal, {width: "auto"}]}>
                   <CircularButton source={iconPath_a}/>
                    <CircularButton source={iconPath_b}/>
                </View>

            </View>
        </LinearGradient>
    )
}