import { Colors } from "./colors/colors";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.PrimaryColorBg,
        justifyContent: "center",
        alignItems: "center"
    },
    sub_container_a: {
        width: '100%',
        padding: 50,
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    sub_container_b: {
        width: '100%',
        flex: 3,
        justifyContent: "flex-start",
        padding: 10
    },
    sub_container_c: {
        width: '95%',
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 0.5,
    },
    sub_container_horizontal: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    scrollContainer: {
        width: "auto",
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    loading_text: {
        color: Colors.PrimaryColorFg,
        fontSize: 20
    },
    logo: {
        width: 125,
        height: 120
    },
    input_container: {
        backgroundColor: Colors.LightGray,
        color: Colors.PrimaryColorBg,
        borderRadius: 10,
        width: '90%',
        fontSize: 18,
        padding: 5,
        marginBottom: 20
    },
    inputHalfWidth: {
        width: '48%'
    },
    form_heading: {
        fontFamily: 'roboto_bold',
        fontSize: 35,
        color: Colors.PrimaryColorFg,
        width: '90%',
        alignSelf: "flex-start"
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
        marginBottom: 10,
        alignSelf: "center"
    },
    buttonInnerContainer: {
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: '100%',
    },
    buttonText: {
        fontFamily: 'roboto_regular',
        color: Colors.PrimaryColorFg,
        fontSize: 20,
    },
    cardViewContainer: {
        flexDirection: "column",
        width: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        gap: 20
    },
    cardViewHeading: {
        fontSize: 20,
        fontFamily: 'roboto_bold',
        color: Colors.PrimaryColorFg
    },
    cardViewText: {
        fontFamily: 'roboto_regular',
        color: Colors.PrimaryColorFg
    },
    iconSmall: {
        width: 30,
        height: 30
    },
    pickerContainer: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.LightGray,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    pickerStyle: {
        width: '105%',
        color: '#787878',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
    },
    errorText: {
        width: '90%',
        fontFamily: "roboto_regular",
        color: Colors.Red,
        fontSize: 15,
        textAlign: "center",
        marginBottom: 10,
        alignSelf: "center"
    }
});

export default Styles;
