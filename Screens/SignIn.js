import {View, Text, Image, StatusBar, KeyboardAvoidingView, Platform} from "react-native";
import Button from "../Components/Button"
import Styles from "../assets/Styles";
import InputField from "../Components/InputField";
import React, {useState} from "react";

export default function SignIn({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const styles = Styles;
    function signInHandler(){
        console.log(email, password);
        if(email.trim() === "" || password.trim() === ""){
            setError("Please enter all the fields.");
        }
        else if(!email.trim().includes('@') || !email.trim().endsWith('.com')){
            setError("Please provide a valid email address");
        }
        else if(password.trim().length < 6){
            setError("Password should contain more than 6 characters")
        }
        else{
            setError("");
            //TODO - add API call
            //     - check manage the state
        }
    }
    function signUpHandler(){
        navigation.navigate("SignUp");
    }
    return(
        <View style={styles.container}>
            <StatusBar barStyle={"default"}/>
            <View style={styles.sub_container_a}>
                <Image style={styles.logo} source={require('../assets/icons/app-logo.png')}/>
            </View>
            <KeyboardAvoidingView
                style={styles.sub_container_b}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={30}>
                <Text style={styles.form_heading}>SignIn</Text>
                <Text style={styles.errorText}>{error ? error : null}</Text>
                <InputField style={styles.input_container} placeholder={"Email"} inputMode={"email"} keyboardType={"email-address"} setText={setEmail}/>
                <InputField style={styles.input_container} placeholder={"Password"} secureTextEntry={true} setText={setPassword}/>
                <View style={styles.sub_container_c}>
                    <Button text={"Sign up"} onPress={signUpHandler}/>
                    <Button text={"Sign in"} onPress={signInHandler}/>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
