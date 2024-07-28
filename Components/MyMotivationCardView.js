import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../assets/colors/colors";
import Styles from "../assets/Styles";
import { Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import AddMotivationModal from "./AddMotivationModal";

export default function MyMotivationCardView() {
    const [motivationText, setMotivationText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <LinearGradient
            colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.cardViewContainer}>
                {/*Horizontal view*/}
                <View style={[Styles.sub_container_horizontal, { width: '95%' }]}>
                    <Text style={Styles.cardViewHeading}>My Motivation</Text>
                    <Image style={Styles.iconSmall} source={require("../assets/icons/achievement.png")} />
                </View>
                <Pressable onPress={() => setModalVisible(true)} style={{width: '95%'}}>
                    <Text style={[Styles.cardViewText, { alignSelf: "flex-start", marginBottom: 5, color: motivationText ? Colors.PrimaryColorFg : Colors.LightGray}]}>
                        {motivationText ? motivationText : "Click to add your motivation."}
                    </Text>
                </Pressable>
            <AddMotivationModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setSavedText={setMotivationText}
            />
        </LinearGradient>
    );
}
