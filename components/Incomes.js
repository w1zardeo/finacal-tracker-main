import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BlueButton from "./BlueButton";

export default function Incomes({ title, data, text, buttonTitle, onPress }) {
  const hideContainer = !data && !text;

  return (
    <View style={hideContainer ? styles.onlyButtonContainer : styles.textContainer}>
      {!hideContainer && <Text style={styles.topLeftText}>{title}</Text>}

      <View style={styles.centerTextWrapper}>
        {!hideContainer && (
          <>
            <Text style={styles.dataText}>{data}</Text>
            <Text style={styles.centerText}>{text}</Text>
          </>
        )}

        {/* Кнопка завжди виглядає однаково */}
        <BlueButton title={buttonTitle} onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: 370,
    marginLeft: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  onlyButtonContainer: {
    width: 370,
    marginLeft: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    // ❗ без backgroundColor — немає білого фону
  },
  topLeftText: {
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 16,
    color: "black",
  },
  centerTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dataText: {
    fontSize: 16,
    color: "#111",
    textAlign: "center",
    width: "90%",
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  centerText: {
    paddingTop: 5,
    fontSize: 16,
    color: "#111",
    textAlign: "center",
    width: "90%",
    flexWrap: "wrap",
  },
});
