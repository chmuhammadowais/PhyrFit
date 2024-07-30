import {Checkbox} from "expo-checkbox";
import {View, Text} from "react-native";
import Styles from "../assets/Styles";
import {Colors} from "../assets/colors/colors";

export default function CheckBox({text, value, onValueChange}){

    return(
        <View style={[Styles.sub_container_horizontal, {alignItems: "flex-start", justifyContent: "flex-start"}]}>
            <Checkbox value={value} onValueChange={onValueChange} style={{borderRadius: 10, borderWidth: 2, borderColor: Colors.ButtonColor}}> </Checkbox>
            <Text style={[Styles.cardViewText, {marginLeft: 10}]}>{text}</Text>
        </View>
    )
}