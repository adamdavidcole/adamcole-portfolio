import styled from "styled-components";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import { SPACING_PX } from "../utility/style-constants";
import getVimeoEmbed from "../utility/get-vimeo-embed";

import {
  getProjectTitle,
  getProjectSubtitle,
  getProjectTextEl,
  getProjectKeywords,
  getProjectGraphicURLs,
  getProjectImageURLs,
  getProjectVideoLinks,
} from "../data/data-selectors";
import { H2, H3, H4, Body } from "../utility/typography";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VisualContent = styled.div`
  display: flex;
  flex-align: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const VisualContentElement = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 48%;
`;

const VisualContentImg = styled.img`
  width: 100%;
  max-height: 450px;
  max-width: 800px;
  object-fit: contain;
  //   box-shadow: inset 0 0 5px 0px rgb(0, 0, 0, 0.5);
`;

const VisualContentVideo = styled.video`
  width: 100%;
  max-height: 450px;
  max-width: 800px;
  object-fit: contain;
`;

const DescriptionBody = styled(Body)`
  margin-top: 2rem;
`;

const SlideContainer = styled.div`
  max-height: 450px;
  max-width: 800px;
`;

function SimpleSlider({ slides = [] }) {
  console.log(slides);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide) => (
          <SlideContainer>{slide}</SlideContainer>
        ))}
      </Slider>
    </div>
  );
}

function FeaturedProject({ project }) {
  const [videoEmbed, setVideoEmbed] = useState();

  useEffect(() => {
    const videoLinks = getProjectVideoLinks(project);
    console.log("videoLinks", videoLinks);
    if (videoLinks?.length > 0) {
      const firstVideoLink = videoLinks[0];
      console.log("fetch VIDEO LINKS", firstVideoLink);

      getVimeoEmbed({ url: firstVideoLink }).then((response) => {
        console.log("yoo", response);
        setVideoEmbed(response.html);
      });
    }
  }, [project]);

  const imageURLs = getProjectImageURLs(project);
  console.log("imageURLs", imageURLs);
  const images = imageURLs?.map((imageURL) => (
    <VisualContentImg key={imageURL} src={imageURL} alt={""} />
  ));

  const graphicURLs = getProjectGraphicURLs(project);
  console.log(graphicURLs);

  const videos = graphicURLs?.map((videoURL) => (
    <VisualContentVideo autoPlay muted preload loop>
      <source src={videoURL} type="video/mp4" />
    </VisualContentVideo>
  ));

  return (
    <div>
      <VisualContent>
        {videoEmbed && (
          <VisualContentElement
            dangerouslySetInnerHTML={{ __html: videoEmbed }}
          />
        )}
        {/* <VisualContentElement>
          {images && <SimpleSlider slides={images} />}
        </VisualContentElement> */}
        <VisualContentElement>
          {videos && <SimpleSlider slides={videos} />}
        </VisualContentElement>
      </VisualContent>
      <VisualContent>
        <VisualContentElement>
          <H3>{getProjectTitle(project)}</H3>
          <H4 fontWeight={400}>{getProjectSubtitle(project)}</H4>
          <div>
            <strong>Tools:</strong> {getProjectKeywords(project)?.join(", ")}
          </div>
        </VisualContentElement>
        <VisualContentElement>
          <DescriptionBody>
            <div>{getProjectTextEl(project)}</div>
          </DescriptionBody>
        </VisualContentElement>
      </VisualContent>
    </div>
  );
}

const FeaturedProjectsContainer = styled.div`
  margin: 0 ${SPACING_PX[250]};
`;

export default function FeaturedProjects({ featuredProjects = [] } = {}) {
  return (
    <FeaturedProjectsContainer>
      <H2>Selected Works</H2>
      {featuredProjects.map((project) => (
        <FeaturedProject key={project._id} project={project} />
      ))}
    </FeaturedProjectsContainer>
  );
}
