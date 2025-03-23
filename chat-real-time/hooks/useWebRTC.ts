import { useEffect, useRef, useState } from "react";
import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
import io from "socket.io-client";
import { iceServers } from "../config/iceServers";

// Configurar los ICE Servers de Xirsys
const localIceServers = iceServers;

export const useWebRTC = (userId: string, token: string) => {
    const socket = useRef(io("http://TU_BACKEND_URL:3000", { auth: { token } })).current;
    const peerConnection = useRef(new RTCPeerConnection({ iceServers })).current;
  
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
  
    useEffect(() => {
      socket.on("callIncoming", async ({ from, signal }) => {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answerCall", { to: from, signal: answer });
        setCallAccepted(true);
      });
  
      socket.on("callAccepted", (signal) => {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
        setCallAccepted(true);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const startCall = async (targetUserId: string) => {
      const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream as unknown as MediaStream);
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      
      const offer = await peerConnection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
      await peerConnection.setLocalDescription(offer);
      
      socket.emit("callUser", { userToCall: targetUserId, signalData: offer, from: userId });
    };
  
    const toggleMute = () => {
      if (localStream) {
        localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        setIsMuted(!isMuted);
      }
    };
  
    const toggleCamera = () => {
      if (localStream) {
        localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        setIsCameraOn(!isCameraOn);
      }
    };
  
    return { localStream, remoteStream, startCall, callAccepted, toggleMute, toggleCamera, isMuted, isCameraOn };
  };
  