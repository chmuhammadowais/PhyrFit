import {Image, Pressable, TouchableOpacity, View} from "react-native";
import Styles from "../assets/Styles";

export default function CircularButton({source}){
    return(
       <View style={{justifyContent: "flex-end", marginLeft: 10}}>
           <TouchableOpacity>
               <Image style={Styles.iconSmall} source={source} />
           </TouchableOpacity>
       </View>
    )
}