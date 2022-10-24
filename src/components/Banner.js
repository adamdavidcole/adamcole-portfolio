import { useRef, useEffect } from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #000000;
`;

const Letter = styled.span`
  font-size: 60vh;
`;

const VideoContainer = styled.div``;

const Video = styled.video`
  width: 100%;
  max-height: 512px;
`;

function playVideoStep(videoRef) {
  console.log("playing video step");
  videoRef.current.play();
  setTimeout(() => {
    videoRef.current.pause();
  }, 100);
}

export default function Banner() {
  const videoRefA = useRef();
  const videoRefC = useRef();

  useEffect(() => {
    if (videoRefA.current) videoRefA.current.pause();
    if (videoRefC.current) videoRefC.current.pause();

    if (videoRefA.current && videoRefC.current) {
      setPlayBack(videoRefA);
      setPlayBack(videoRefC);
    }
  }, [videoRefA.current, videoRefC.current]);

  const setPlayBack = (videoRef) => {
    videoRef.current.playbackRate = 0.35;
    // videoRef.current.currentTime = Math.random() * 0.1;
    videoRef.current.play();
    // setInterval(() => {
    //   console.log("interval tick");
    //   playVideoStep(videoRef);
    // }, 5000);
  };

  const videoTypes = ["feathers", "squid"];
  const randomVideo = videoTypes[Math.floor(Math.random() * videoTypes.length)];

  const videoFolder = `/videos/${randomVideo}`;

  return (
    <BannerContainer>
      <VideoContainer>
        <Video
          autoPlay
          playsInline
          muted
          loop
          paused
          ref={videoRefA}
          onCanPlay={() => setPlayBack(videoRefA)}
        >
          <source src={`${videoFolder}/a.mp4`} type="video/mp4" />
        </Video>
      </VideoContainer>
      <VideoContainer>
        <Video
          autoPlay
          playsInline
          muted
          loop
          paused
          ref={videoRefC}
          onCanPlay={() => setPlayBack(videoRefC)}
        >
          <source src={`${videoFolder}/c.mp4`} type="video/mp4" />
        </Video>
      </VideoContainer>
    </BannerContainer>
  );
}
