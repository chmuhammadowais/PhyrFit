import {View, Text, Image, StatusBar, KeyboardAvoidingView, Platform} from "react-native";
import Button from "../Components/Button"
import Styles from "../assets/Styles";
import InputField from "../Components/InputField";
export default function SignIn({navigation}){
    function signInHandler(){

    }
    function signUpHandler(){
        navigation.navigate("SignUp");
    }
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
                <InputField style={Styles.input_container} placeholder={"Email"} inputMode={"email"} keyboardType={"email-address"}/>
                <InputField style={Styles.input_container} placeholder={"Password"} secureTextEntry={true}/>
                <View style={Styles.sub_container_c}>
                    <Button text={"Sign up"} onPress={signUpHandler}/>
                    <Button text={"Sign in"} onPress={signInHandler}/>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
