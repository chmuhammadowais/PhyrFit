import React, { useState } from 'react';
import { View, Text, Image, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Button from '../Components/Button';
import Styles from '../assets/Styles';
import InputField from '../Components/InputField';
import OptionsPicker from "../Components/OptionsPicker";
export default function SignUp() {
    const [selectedItem, setSelectedItem] = useState(null);
    const items = [
        {
            label: "Loose Weight",
            value: "Loose Weight"
        },
        {
            label: "Gain Weight",
            value: "Gain Weight"
        },
        {
            label: "Build Muscle",
            value: "Build Muscle"
        }]
    return (
        <View style={Styles.container}>
            <StatusBar barStyle={'default'} />
            <View style={Styles.sub_container_a}>
                <Image style={Styles.logo} source={require('../assets/icons/app-logo.png')} />
            </View>
            <KeyboardAvoidingView
                style={Styles.sub_container_b}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={30}>
                <Text style={Styles.form_heading}>SignUp</Text>
                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <InputField style={Styles.input_container} placeholder={'Full Name'} />
                    <InputField style={Styles.input_container} placeholder={'Email'} inputMode={'email'} keyboardType={'email-address'} />
                    <InputField style={Styles.input_container} placeholder={'Password'} secureTextEntry={true} />
                    <InputField style={Styles.input_container} placeholder={'Phone'} inputMode={'tel'} />
                    <View style={Styles.sub_container_c} >
                        <InputField placeholder={'Height'} secureTextEntry={false} keyboardType={'decimal-pad'} width={'48%'} />
                        <InputField placeholder={'Weight'} secureTextEntry={false} keyboardType={'decimal-pad'} width={'48%'} />
                    </View>

                <OptionsPicker selectedItem={selectedItem} setSelectedItem={setSelectedItem} items={items}/>

                </ScrollView>
                <Button text={'Sign up'} />
            </KeyboardAvoidingView>
        </View>
    );
}
