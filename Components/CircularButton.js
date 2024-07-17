import {Image, Pressable, TouchableOpacity, View} from "react-native";
import Styles from "../assets/Styles";

export default function CircularButton({source,containerStyle, imageStyle}){
    return(
       <View style={[{justifyContent: "flex-end", marginLeft: 10}, containerStyle]}>
           <TouchableOpacity>
               <Image style={[Styles.iconSmall, imageStyle]} source={source} />
           </TouchableOpacity>
       </View>
    )
}