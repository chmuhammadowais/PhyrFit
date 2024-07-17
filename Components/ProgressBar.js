import { Text, View } from "react-native";
import Styles from "../assets/Styles";
import { Colors } from "../assets/colors/colors";

export default function ProgressBar({fillPercentage}) {
    return (
        <View style={[Styles.sub_container_horizontal, {
            backgroundColor: Colors.ButtonColor,
            width: '90%',
            height: 10,
            marginTop: -10,
            borderRadius: 10,
            justifyContent: 'center', // Center content horizontally
            alignItems: 'center' // Center content vertically
        }]}>
            <View style={[Styles.sub_container_horizontal, {
                backgroundColor: Colors.FilledCircleDark,
                width: `${fillPercentage}%`,
                height: 10,
                borderRadius: 10,
                position: 'absolute',
                left: 0, // Align to the left
                justifyContent: 'flex-start', // Align items to the start (left)
            }]} />
            <Text style={{
                color: Colors.PrimaryColorFg,
                position: 'absolute',
                textAlign: 'center',
                width: '100%'
            }}>{fillPercentage}%</Text>
        </View>
    );
}
