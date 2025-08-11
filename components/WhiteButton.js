import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function WhiteButton({ title, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 0,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: '80%',
    borderWidth: 1,
    borderColor: '#0063D8',
    alignSelf: "center"
  },
  buttonText: {
    color: "#0063D8",
    fontWeight: "600",
    fontSize: 16,
  },
});