import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const IconButtons = () => {
  return (
    <View style={styles.icons}>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="call" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="videocam" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons name="more-vert" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
  },
  iconButton: {
    padding: 8,
  },
});

export default IconButtons;
