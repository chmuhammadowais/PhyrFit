import { ActivityIndicator, Image, Text, View } from "react-native";
import Styles from "../assets/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../assets/colors/colors";
import { useEffect, useState } from "react";

export default function QuoteCardView() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    async function api_call() {
      try {
        const timeoutMs = 30000;
        const response = await Promise.race([
          fetch(`https://api.api-ninjas.com/v1/quotes?category=fitness`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "3cSUmdQLqkX2IwJe76x4OQ==7VTRmfyWSzi4s80P",
            },
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
          ),
        ]);
        const data = await response.text();
        const dataJson = JSON.parse(data);
        setQuote(dataJson[0].quote);
      } catch (err) {
        console.log("Error fetching data: ", err.message);
        setQuote("Unable to fetch quote. Please try again later.");return;
      }
    }
    api_call();
  }, [setQuote]);

  return (
    //vertical view
    <LinearGradient
      colors={[Colors.ButtonColor, Colors.FilledCircleLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={Styles.cardViewContainer}
    >
      {/*Horizontal view*/}
      <View style={[Styles.sub_container_horizontal, { width: "95%" }]}>
        <Text style={Styles.cardViewHeading}>Quote of The Day</Text>
        <Image
          style={Styles.iconSmall}
          source={require("../assets/icons/quote.png")}
        />
      </View>

      {/*Horizontal view*/}
      <View style={[Styles.sub_container_horizontal, { width: "95%" }]}>
        <View>
          {!quote ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={Styles.cardViewText}>
              {quote ? quote : "Error loading the quote."}
            </Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}
