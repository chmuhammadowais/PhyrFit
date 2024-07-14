import { View, Text, Image} from "react-native";
import {ActivityIndicator} from "react-native";
import Styles from "../assets/Styles";
export default function Splash(){
    return(
        <View style={Styles.container}>
            <View style={Styles.sub_container_a}>
                <Image style={Styles.logo} source={require('../assets/icons/app-logo.png')}/>
            </View>
            <View style={Styles.sub_container_b}>
                <Text style={Styles.loading_text}>Loading please be patient...</Text>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </View>
    );
}
