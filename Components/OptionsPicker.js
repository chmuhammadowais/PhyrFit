import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import Styles from "../assets/Styles";

export default function OptionsPicker({
  selectedItem,
  setSelectedItem,
  items,
}) {
  return (
    <View style={Styles.pickerContainer}>
      <Picker
        style={Styles.pickerStyle}
        selectedValue={selectedItem}
        onValueChange={(itemValue) => setSelectedItem(itemValue)}
      >
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    </View>
  );
}
