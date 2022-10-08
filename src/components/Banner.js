import { useRef } from "react";
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
  height: 78vh;
`;

export default function Banner() {
  const videoRefA = useRef();
  const videoRefC = useRef();

  const setPlayBack = (videoRef) => {
    videoRef.current.playbackRate = 0.5;
  };

  return (
    <BannerContainer>
      <VideoContainer>
        <Video
          autoPlay
          muted
          preload
          loop
          ref={videoRefA}
          onCanPlay={() => setPlayBack(videoRefA)}
        >
          <source src="/videos/a_interpolated_squid.mp4" type="video/mp4" />
        </Video>
      </VideoContainer>
      <VideoContainer>
        <Video
          autoPlay
          muted
          preload
          loop
          ref={videoRefC}
          onCanPlay={() => setPlayBack(videoRefC)}
        >
          <source src="/videos/a_interpolated_squid.mp4" type="video/mp4" />
        </Video>
      </VideoContainer>
    </BannerContainer>
  );
}
