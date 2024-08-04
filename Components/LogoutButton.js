import { Image, Pressable, View } from "react-native";
import Styles from "../assets/Styles";

export default function LogoutButton({ onPress }) {
    return (
        <View style={Styles.logoutButtonContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [
                            Styles.buttonInnerContainer,
                            { opacity: 0.75 },
                        ]
                        : Styles.buttonInnerContainer
                }
                onPress={onPress}
            >
                <Image style={{width: 30, height: 30}} source={require('../assets/icons/logout.png')} />
            </Pressable>
        </View>
    );
}
