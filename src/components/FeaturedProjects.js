import styled from "styled-components";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import { SPACING_PX } from "../utility/style-constants";
import getVimeoEmbed from "../utility/get-vimeo-embed";
import { VimeoEmbed } from "./VimeoEmbed";

import {
  getProjectId,
  getProjectTitle,
  getProjectSubtitle,
  getProjectTextEl,
  getProjectKeywords,
  getProjectGraphicsURLs,
  getProjectVideoLinks,
  projectHasGraphics,
  projectHasVideoLinks,
} from "../data/data-selectors";
import { H2, H3, SerifH3, H4, Body } from "../utility/typography";
import { device, margins } from "../utility/style-constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProjectContainer = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 4rem;
  padding-bottom: 8rem;
`;

const VisualContent = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  margin-bottom: ${margins.large};

  @media ${device.tablet} {
    margin-bottom: 0;
    margin: 0 ${margins.large};

    flex-direction: ${(props) => (props.singleColumn ? "column" : "row")};
    align-items: ${(props) => (props.singleColumn ? "center" : "flex-start")};
    justify-content: ${(props) =>
      props.singleColumn ? "center" : "space-between"};
  }
`;

const VisualContentText = styled(VisualContent)`
  margin: 0 ${margins.small};

  @media ${device.tablet} {
    margin: 0 ${margins.large};
  }
`;

const VisualContentElement = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;

  @media ${device.tablet} {
    width: 48%;
    margin-bottom: 40px;
  }
`;

const VisualContentElementVideo = styled(VisualContentElement)`
  margin-bottom: ${margins.medium};

  @media ${device.tablet} {
    margin-bottom: 0;
  }
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
  @media ${device.tablet} {
    margin-top: ${margins.large};
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
`;

const SlideContainer = styled.div`
  max-height: 450px;
  max-width: 800px;
`;

function SimpleSlider({ slides = [], projectId }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
  };

  return (
    <SliderContainer>
      <Slider {...settings} key={projectId}>
        {slides.map((slide, i) => (
          <SlideContainer key={i}>{slide}</SlideContainer>
        ))}
      </Slider>
    </SliderContainer>
  );
}

export function FeaturedProject({ project }) {
  const [videoEmbed, setVideoEmbed] = useState();

  useEffect(() => {
    const videoLinks = getProjectVideoLinks(project);
    if (videoLinks?.length > 0) {
      const firstVideoLink = videoLinks[0];

      getVimeoEmbed({ url: firstVideoLink }).then((response) => {
        setVideoEmbed(response.html);
      });
    }
  }, [project]);

  const projectId = getProjectId(project);

  const graphicURLs = getProjectGraphicsURLs(project);

  const graphics = graphicURLs?.map((graphicURL) => {
    if (graphicURL.includes(".mp4"))
      return (
        <VisualContentVideo autoPlay playsInline muted loop>
          <source src={graphicURL} type="video/mp4" />
        </VisualContentVideo>
      );

    return <VisualContentImg src={graphicURL} alt={""} />;
  });

  const hasVideoLinks = projectHasVideoLinks(project);
  const hasGraphics = projectHasGraphics(project);
  console.log("hasGraphics", hasGraphics);
  const singleColumnVisualContent =
    (hasVideoLinks && !hasGraphics) || (!hasVideoLinks && hasGraphics);

  const projectTiles = (
    <>
      <SerifH3>{getProjectTitle(project)}</SerifH3>
      <H4 fontWeight={400}>{getProjectSubtitle(project)}</H4>
    </>
  );

  const projectDescriptions = (
    <>
      <DescriptionBody>
        <div>{getProjectTextEl(project)}</div>
      </DescriptionBody>
      <div>
        <strong>Tools:</strong> {getProjectKeywords(project)?.join(", ")}
      </div>
    </>
  );

  return (
    <FeaturedProjectContainer>
      <VisualContent singleColumn={singleColumnVisualContent}>
        {hasVideoLinks && (
          <VisualContentElementVideo>
            <VimeoEmbed project={project} />
          </VisualContentElementVideo>
        )}
        {hasGraphics && (
          <VisualContentElement>
            {graphics && (
              <SimpleSlider slides={graphics} projectId={projectId} />
            )}
          </VisualContentElement>
        )}
      </VisualContent>
      <VisualContentText singleColumn={singleColumnVisualContent}>
        <VisualContentElement>{projectTiles}</VisualContentElement>
        <VisualContentElement>{projectDescriptions}</VisualContentElement>
      </VisualContentText>
    </FeaturedProjectContainer>
  );
}

const FeaturedProjectsContainer = styled.div`
  //   margin: 0 ${SPACING_PX[250]};
`;

const FeaturedProjectsTitle = styled(H4)`
  text-transform: uppercase;
  letter-spacing: 4px;
  word-spacing: 2px;
`;

export default function FeaturedProjects({ featuredProjects = [] } = {}) {
  return (
    <FeaturedProjectsContainer>
      <VisualContentText>
        <FeaturedProjectsTitle>Selected Works</FeaturedProjectsTitle>
      </VisualContentText>
      {featuredProjects.map((project) => (
        <FeaturedProject key={project._id} project={project} />
      ))}
    </FeaturedProjectsContainer>
  );
}
