import styled, { createGlobalStyle } from "styled-components";

import { VimeoEmbed } from "./VimeoEmbed";
import SimpleSlider from "./SimpleSlider";

import {
  getProjectId,
  getProjectTitle,
  getProjectSubtitle,
  getProjectTextEl,
  getProjectKeywords,
  getProjectGraphicsURLs,
  projectHasGraphics,
  projectHasVideoLinks,
} from "../data/data-selectors";
import { SerifH3, H4, Body } from "../utility/typography";
import {
  device,
  margins,
  margins_num,
  SPACING_PX,
} from "../utility/style-constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// slick-arrow slick-prev

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
  max-width: 800px;

  @media ${device.tablet} {
    width: ${(props) =>
      props.singleColumn ? "100%" : `calc(50% - ${margins_num.large / 2}px)`};
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
  // width: 100%;
  // max-height: 450px;
  max-width: 100%;
  object-fit: contain;
  //   box-shadow: inset 0 0 5px 0px rgb(0, 0, 0, 0.5);
`;

const VisualContentVideo = styled.video`
  // width: 100%;
  // max-height: 450px;
  max-width: 100%;
  object-fit: contain;
`;

const DescriptionBody = styled(Body)`
  @media ${device.tablet} {
    margin-top: ${margins.large};
  }
`;

export function FeaturedProject({ project, lazyLoad = "ondemand" }) {
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
          <VisualContentElementVideo singleColumn={singleColumnVisualContent}>
            <VimeoEmbed project={project} />
          </VisualContentElementVideo>
        )}
        {hasGraphics && (
          <VisualContentElement singleColumn={singleColumnVisualContent}>
            <SimpleSlider
              slides={graphics}
              id={projectId}
              lazyLoad={lazyLoad}
            />
          </VisualContentElement>
        )}
      </VisualContent>
      <VisualContentText singleColumn={singleColumnVisualContent}>
        <VisualContentElement singleColumn={singleColumnVisualContent}>
          {projectTiles}
        </VisualContentElement>
        <VisualContentElement singleColumn={singleColumnVisualContent}>
          {projectDescriptions}
        </VisualContentElement>
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
