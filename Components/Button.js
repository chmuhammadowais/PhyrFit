import {Pressable, View, Text} from "react-native";
import Styles from "../assets/Styles";
import {Colors} from "../assets/colors/colors";
export default function Button({text, onPress, customStyle, textStyle}){
    return(
        <View style={[Styles.buttonOuterContainer, customStyle]}>
            <Pressable
                style={({pressed}) => pressed ? [Styles.buttonInnerContainer, {opacity: 0.75, backgroundColor: Colors.FilledCircleLight}] : Styles.buttonInnerContainer}
                android_ripple={{color: Colors.PrimaryColorFg}}
                onPress={onPress}>
                <Text style={[Styles.buttonText, textStyle]}>{text}</Text>
            </Pressable>
        </View>
    )
}