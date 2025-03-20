import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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

const styles = {
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 120,
  },
  iconButton: {
    padding: 5,
  },
};

export default IconButtons;
