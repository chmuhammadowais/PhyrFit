import {StyleSheet, View, Text, Image, StatusBar} from "react-native";
import {ActivityIndicator} from "react-native";
import {Colors} from "../assets/colors/colors";
export default function Splash(){
    return(
        <View style={styles.container}>
            <StatusBar barStyle={"default"}/>
            <Image style={styles.logo} source={require('../assets/icons/app-logo.png')}/>
            <View style={styles.sub_container}>
                <Text style={styles.loading_text}>Loading please be patient...</Text>
                <ActivityIndicator size="large" color="#fff" />
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.PrimaryColorBg,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    sub_container:{
        flexDirection: "column",
        gap: 30
    },
    loading_text:{
        color: Colors.PrimaryColorFg,
        fontSize: 20
    },
    logo:{
        width: 138,
        height:133
    }
})