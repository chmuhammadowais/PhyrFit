import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Styles from "../assets/Styles";

export default function CircularButton({
  source,
  containerStyle,
  imageStyle,
  onPress,
}) {
  return (
    <View
      style={[{ justifyContent: "flex-end", marginLeft: 10 }, containerStyle]}
    >
      <TouchableOpacity onPress={onPress}>
        <Image style={[Styles.iconSmall, imageStyle]} source={source} />
      </TouchableOpacity>
    </View>
  );
}
