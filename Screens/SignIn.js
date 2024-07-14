import {View, Text, Image, StatusBar, TextInput, KeyboardAvoidingView, Platform} from "react-native";
import Button from "../Components/Button"
import Styles from "../assets/Styles";
export default function SignIn(){
    return(
        <View style={Styles.container}>
            <StatusBar barStyle={"default"}/>
            <View style={Styles.sub_container_a}>
                <Image style={Styles.logo} source={require('../assets/icons/app-logo.png')}/>
            </View>
            <KeyboardAvoidingView
                style={Styles.sub_container_b}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={30}>
                <Text style={Styles.form_heading}>SignIn</Text>
                <TextInput style={Styles.input_container} placeholder={"Email"} inputMode={"email"} keyboardType={"email-address"}/>
                <TextInput style={Styles.input_container} placeholder={"Password"}/>
                <Button text={"Sign in"}/>
            </KeyboardAvoidingView>
        </View>
    );
}
