import {ScrollView, Text, View} from "react-native";
import Styles from "../assets/Styles";
import React, {useContext, useState} from "react";
import InputField from "../Components/InputField";
import OptionsPicker from "../Components/OptionsPicker";
import {UserContext} from "../Store/store";
import Button from "../Components/Button";

export default function Profile(){
    const {user} = useContext(UserContext)
    const [fullName, setFullName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(user.phone);
    const [height, setHeight] = useState(user.height);
    const [weight, setWeight] = useState(user.weight);
    const [age, setAge] = useState(user.age);
    const items = [
        {label: "Loose Weight",
        value: "Loose Weight"},
        {label: "Gain Weight",
            value: "Gain Weight"},
        {label: "Get Fit",
            value: "Get Fit"},
    ];
    const [selectedItem, setSelectedItem] = useState(null);
    return(
        <View style={Styles.container}>
            <View style={Styles.sub_container_c}>
                <Text style={Styles.form_heading}>Profile</Text>
            </View>
            <View style={Styles.sub_container_b}>
                <ScrollView contentContainerStyle={[Styles.scrollContainer, {marginTop: 20}]}>
                    <InputField style={Styles.input_container} placeholder={fullName} setText={setFullName} />
                    <InputField style={Styles.input_container} placeholder={email} inputMode={'email'} keyboardType={'email-address'} setText={setEmail} />
                    <InputField style={Styles.input_container} placeholder={'Password'} secureTextEntry setText={setPassword} />
                    <InputField style={Styles.input_container} placeholder={phone} inputMode={'tel'} setText={setPhone} />
                    <InputField style={Styles.input_container} placeholder={`${age} Years`} keyboardType={'numeric'} setText={setAge} />
                    <View style={Styles.sub_container_horizontal}>
                        <InputField placeholder={`${height} cm`} secureTextEntry={false} keyboardType={'decimal-pad'} width={'48%'} setText={setHeight} />
                        <InputField placeholder={`${weight} KG`} secureTextEntry={false} keyboardType={'decimal-pad'} width={'48%'} setText={setWeight} />
                    </View>
                    <OptionsPicker items={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                    <Button text={"Update"} />
                </ScrollView>

            </View>
        </View>
    )
}