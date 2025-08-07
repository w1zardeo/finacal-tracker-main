import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DateNavigator({ date, onLeftPress, onRightPress }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onLeftPress}>
        <Ionicons name="chevron-back" size={24} color="#000000" />
      </Pressable>
      <Text style={styles.dateText}>{date}</Text>
      <Pressable onPress={onRightPress}>
        <Ionicons name="chevron-forward" size={24} color="#000000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: "#EFF9FC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#97B5D8',
  },
  dateText: {
    color: "#000000",
    fontSize: 18,
  },
});
