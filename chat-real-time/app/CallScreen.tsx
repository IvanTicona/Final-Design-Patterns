import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RTCView } from "react-native-webrtc";
import { useWebRTC } from "../hooks/useWebRTC";
import PhoneHangUp from "@/components/ui/PhoneHangOut";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Unmute from "@/components/ui/Unmute";
import Mute from "@/components/ui/Mute";
import Phone from "@/components/ui/Phone";
import Camera from "@/components/ui/Camera";
import CameraOff from "@/components/ui/CameraOff";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLocalSearchParams } from "expo-router";

type CallScreenProps = NativeStackScreenProps<any, 'CallScreen'>;

const CallScreen: React.FC<CallScreenProps> = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const UserID = "67d80c3f402c50b64c5d855b"
  const {
    localStream,
    remoteStream,
    startCall,
    callAccepted,
    toggleMute,
    toggleCamera,
    isMuted,
    isCameraOn,
  } = useWebRTC(user?._id || "", (user as any)?.token || "");

  return (
    <View style={styles.container}>
      {remoteStream && callAccepted ? (
        <RTCView
          streamURL={(remoteStream as any)?.toURL?.() || ""}
          style={styles.video}
        />
      ) : (
        <Text style={styles.waitingText}>Esperando conexión...</Text>
      )}

      {localStream && (
        <RTCView
          streamURL={(localStream as any)?.toURL?.() || ""}
          style={styles.localVideo}
        />
      )}

      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleMute} style={styles.button}>
          {isMuted ? <Unmute /> : <Mute />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => startCall(UserID)}
          style={[styles.button, styles.callButton]}
        >
          <Phone />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleCamera} style={styles.button}>
          {isCameraOn ? <Camera /> : <CameraOff />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.hangupButton]}
        >
          <PhoneHangUp />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "80%",
  },
  localVideo: {
    width: 100,
    height: 150,
    position: "absolute",
    top: 20,
    right: 20,
    borderRadius: 10,
  },
  waitingText: {
    color: "#fff",
    fontSize: 18,
  },
  controls: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    width: "90%",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 50,
  },
  callButton: {
    backgroundColor: "green",
  },
  hangupButton: {
    backgroundColor: "red",
  },
});

export default CallScreen;
