import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components'

const main_theme = "#9c27b0";

const VideoChat = () => {
  const socketRef = useRef();
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef();
  const [isCameraOn, setCameraOn] = useState(true);
  const [isMicOn, setMicOn] = useState(true);

  const { roomNum } = useParams();

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isCameraOn,
        audio: isMicOn,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if(!(pcRef.current && socketRef.current)) {
        return;
      }
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidiate = (e) => {
        if (e.candidate) {
            if (!socketRef.current) {
              return;
            }
            console.log("recv candidate");
            socketRef.current.emit("candidate", e.candidate, roomNum);       
        }
      };

      pcRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
        console.error(e)
    }
  };

  const createOffer = async () => {
    console.log("create Offer");
    if(!(pcRef.current && socketRef.current)) {
      return;
    }
    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      socketRef.current.emit("offer", sdp, roomNum);
    } catch(e) {
      console.error(e);
    }
  }

  const createAnswer = async (sdp) => {
    console.log("createAnswer");
    if(!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");
      socketRef.current.emit("answer", answerSdp, roomNum);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleCamera = () => {
    const newState = !isCameraOn
    setCameraOn(newState);
  }

  const toggleMic = () => {
    const newState = !isMicOn
    setMicOn(newState);
  }

  useEffect(() => {
    socketRef.current = io("wss://void-team.kro.kr:8090/api/socket");
  
    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
  
    socketRef.current.on("all_users", (allUsers) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });
  
    socketRef.current.on("getOffer", (sdp) => {
      console.log("recv Offer");
      createAnswer(sdp);
    });
  
    socketRef.current.on("getAnswer", (sdp) => {
      console.log("recv Answer");
      if (!pcRef.current) {
        return;
      }
      pcRef.current.setRemoteDescription(sdp);
    });
  
    socketRef.current.on("getCandidate", async (candidate) => {
      if (!pcRef.current) {
        return;
      }
  
      await pcRef.current.addIceCandidate(candidate);
    });
  
    socketRef.current.emit("join_room", {
      room: roomNum,
    });
  
    getMedia();
  });
  
  return (
    <>
      <PageBody>
        <VideoContainer>
          <VideoBox>
            <MyVideo 
            id="myVideo" 
            playsInline 
            autoPlay
            width="640px"
            height="480px"
            ref={myVideoRef}/>
            <Name>쏭</Name>
          </VideoBox>
          <VideoBox>
          <OpponentVideo 
            id="opponentVideo" 
            playsInline 
            autoPlay
            width="640px"
            height="480px"
            ref={remoteVideoRef}/>
            <Name>장승환</Name>
          </VideoBox>
        </VideoContainer>
        <VideoConsole>
          <CameraButton onClick={toggleCamera} className={isCameraOn ? "On" : "Off"}>
            {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          </CameraButton>
          <MicButton onClick={toggleMic} className={isMicOn ? "On" : "Off"}>
            {isMicOn ? 'Mute Mic' : 'Unmute Mic'}
          </MicButton>
        </VideoConsole>
      </PageBody>
    </>
  )
}

export default VideoChat

const PageBody = styled.div`
  width: 100vw;
  height: 100vh; 
  margin: 0;
  background: #313338;
  color: #ffffff;
`;

const VideoBox = styled.div`
  position: relative;
`;

const Name = styled.div`
  position: absolute;
  bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: black;
  color: #ffffff;
  width: 80px;
  font-size: 1rem;
  border-radius: 10px;
`;

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 800px;
`;


const MyVideo = styled.video`
  background: #8b8b8b;
  margin: 10px 20px 10px 0;
  border-radius: 10px;
`;

const OpponentVideo = styled.video`
  background: #8b8b8b;
  margin: 10px 0 10px 0;
  border-radius: 10px;
`;

const VideoConsole = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  .On {
    background: black;
    color: #ffffff;
  }
`;

const CameraButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100px;
  width: 200px;
  height: 50px;
  margin: 0 10px 0 10px;
  box-sizing: border-box;
  font-family: Pretendard;
  font-size: 1rem;
  color: #ffffff;
  background: #9c27b0;
  cursor: pointer;
  :hover {
    opacity: 0.5;
    transition: 0.3s;
  }
`;

const MicButton = styled(CameraButton)``;