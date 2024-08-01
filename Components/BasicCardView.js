import { Image, Text, View } from "react-native";
import Styles from "../assets/Styles";
import CircularButton from "./CircularButton";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../assets/colors/colors";
import { useEffect, useState } from "react";

export default function BasicCardView({ heading, subText_a, subText_b, tempIsCompleted, onComplete, onIncomplete, iconPath_major, iconPath_a, iconPath_b }) {
    const [isCompleted, setIsCompleted] = useState(tempIsCompleted);

    useEffect(() => {
        setIsCompleted(tempIsCompleted);
    }, [tempIsCompleted]);

    return (
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
            <View style={[Styles.sub_container_horizontal, { width: '95%' }]}>
                <Text style={Styles.cardViewHeading}>{heading}</Text>
                <Image style={Styles.iconSmall} source={iconPath_major} />
            </View>
            <View style={[Styles.sub_container_horizontal, { width: '95%' }]}>
                <View style={{ alignSelf: "center" }}>
                    <Text style={Styles.cardViewText}>{subText_a.length < 40 ? subText_a : subText_a.substring(0, 40).concat('...')}</Text>
                    <Text style={Styles.cardViewText}>{subText_b.length < 40 ? subText_b : subText_b.substring(0, 40).concat('...')}</Text>
                </View>
                {
                    isCompleted === "" && !subText_a.toLowerCase().includes("rest") || isCompleted === null ?
                        <View style={[Styles.sub_container_horizontal, { width: "auto" }]}>
                            <CircularButton source={iconPath_a} onPress={onComplete} />
                            <CircularButton source={iconPath_b} onPress={onIncomplete} />
                        </View> : isCompleted === true ? <Image style={Styles.iconLarge} source={require("../assets/icons/successful_completion_task.png")}/> : isCompleted === false ? <Image style={Styles.iconLarge} source={require("../assets/icons/failure.png")}/> : ""
                }
            </View>
        </LinearGradient>
    );
}
