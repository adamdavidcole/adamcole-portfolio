import { useState } from "react";
import styled from "styled-components";

import {
  getProjectThumbnailImageURL,
  getProjectThumbnailVideoURL,
} from "../data/data-selectors";

const ProjectThumbnailContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ProjectThumbnailImage = styled.img`
  width: 100%;
`;

const ProjectThumbnailVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  visibility: ${(props) => (props.isLoaded ? "visible" : "hidden")};
`;

export default function ProjectThumbnail({ project }) {
  const [isHovering, setIsHovering] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const imageURL = getProjectThumbnailImageURL(project);
  const videoURL = getProjectThumbnailVideoURL(project);

  return (
    <ProjectThumbnailContainer
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ProjectThumbnailImage src={imageURL} />
      {isHovering && (
        <ProjectThumbnailVideo
          autoPlay
          muted
          preload
          loop
          playsInline
          isLoaded={videoLoaded}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={videoURL} type="video/mp4" />
        </ProjectThumbnailVideo>
      )}
    </ProjectThumbnailContainer>
  );
}
