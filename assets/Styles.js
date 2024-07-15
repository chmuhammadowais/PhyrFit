import {Colors} from "./colors/colors";
import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.PrimaryColorBg,
        justifyContent: "center",
        alignItems: "center"
    },
    sub_container_a:{
        width: '100%',
        padding: 50,
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    sub_container_b:{
        width: '100%',
        flex: 1.5,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    sub_container_c:{
        width: '90%',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    scrollContainer: {
        width: 410,
        justifyContent: "center",
        alignItems: "center",
    },
    loading_text:{
        color: Colors.PrimaryColorFg,
        fontSize: 20
    },
    logo:{
        width: 125,
        height:120
    },
    input_container:{
        backgroundColor: Colors.LightGray,
        color: Colors.PrimaryColorBg,
        borderRadius: 10,
        width: '90%',
        fontSize: 18,
        padding: 5,
        marginBottom: 20
    },
    form_heading:{
        fontFamily: 'roboto_bold',
        fontSize: 30,
        color: Colors.PrimaryColorFg,
        width: '90%',
        margin: 10,
    },
    buttonOuterContainer: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: Colors.ButtonColor,
        width: 170,
        borderRadius: 10,
        height: 40,
        marginTop: 20,
        marginBottom: 10
    },
    buttonInnerContainer:{
        justifyContent:'center',
        alignItems: "center",
        width: '100%',
        height: '100%',
    },
    buttonText:{
        fontFamily: 'roboto_regular',
        color: Colors.PrimaryColorFg,
        fontSize: 20,
    },
    pickerContainer:{
        width: '90%',
        height: 40,
        backgroundColor: Colors.LightGray,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    pickerStyle:{
        width: '105%',
        color: '#787878',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
    }
})
export default Styles;