import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getProjectThumbnailImageURL,
  getProjectVideoLinks,
  getVimeoThumbnailURL,
} from "../data/data-selectors";
import getVimeoEmbed from "../utility/get-vimeo-embed";

const VimeoEmbedContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: gray;
`;

const VimeoEmbedThumbnailImg = styled.img`
  width: 100%;
`;

const VimeoFrameContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PlayButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.div`
  background: #599bde;
  border-radius: 4px;
  transform: scale(4);
  opacity: 0.8;

  &:hover {
    opacity: 1;
    background: #599bde;
  }
`;

export function VimeoEmbed({ project }) {
  const [embedHtml, setEmbedHtml] = useState();
  const [playVideo, setPlayVideo] = useState(false);

  console.log("playVideo", playVideo);

  useEffect(() => {
    if (!project) return;

    setPlayVideo(false);
    const videoLinks = getProjectVideoLinks(project);

    if (videoLinks?.length > 0) {
      const firstVideoLink = videoLinks[0];
      console.log("fetch VIDEO LINKS", firstVideoLink);

      getVimeoEmbed({ url: firstVideoLink, autoplay: true }).then(
        (response) => {
          setEmbedHtml(response.html);
        }
      );
    }
  }, [project]);

  if (!project) return null;

  const projectThumbnailURL = getVimeoThumbnailURL(project);

  return (
    <VimeoEmbedContainer
      onClick={() => {
        setPlayVideo(true);
      }}
    >
      <VimeoEmbedThumbnailImg src={projectThumbnailURL} />
      {!playVideo && (
        <PlayButtonContainer>
          <PlayButton className="gg-play-button" />
        </PlayButtonContainer>
      )}
      {playVideo && (
        <VimeoFrameContainer
          dangerouslySetInnerHTML={{ __html: embedHtml }}
        ></VimeoFrameContainer>
      )}
    </VimeoEmbedContainer>
  );
}
