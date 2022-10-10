import styled from "styled-components";
import { useState } from "react";
import {
  getProjectThumbnailImageURL,
  getProjectId,
  getProjectTitle,
  getProjectSubtitle,
  getProjectTextEl,
  getProjectKeywords,
  getProjectGraphicURLs,
  getProjectImageURLs,
  getProjectVideoLinks,
} from "../data/data-selectors";
import { FeaturedProject } from "./FeaturedProjects";

import { H3, H2 } from "../utility/typography";

const animationSpeed = "0.25s";
const expansionWidth = 80;

const ProjectsGridContainer = styled.div`
  display: flex;
`;

const ProjectsContentContainer = styled.div`
  position: relative;
`;

const ProjectDetailsPlaceholder = styled.div`
  flex-shrink: 0;
  width: ${(props) =>
    props.isDetailsExpanded ? `${expansionWidth}vw` : "0vw"};
  transition: width ${animationSpeed} ease;
  border: 1px solid;
`;

const ProjectsGrid = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;

  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;

  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  ${(props) =>
    props.isDetailsExpanded &&
    "grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));"}
`;

const ProjectCardContainer = styled.div`
  width: 100%;
`;

const ProjectCardImg = styled.img`
  width: 100%;
`;

const ProjectDetailsContainer = styled.div`
  position: absolute;
  top: 0;
  width: ${expansionWidth}vw;
  left: ${(props) =>
    props.isDetailsExpanded ? `${100 - expansionWidth}%` : "100%"};
  transition: left ${animationSpeed} ease;
`;

function ProjectCard({ project }) {
  const thumbnailImageURL = getProjectThumbnailImageURL(project);
  return (
    <ProjectCardContainer>
      <ProjectCardImg src={thumbnailImageURL} alt="" />
    </ProjectCardContainer>
  );
}

export default function Projects({ projects }) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  return (
    <div>
      <H3
        onClick={() => {
          setIsDetailsExpanded(!isDetailsExpanded);
        }}
      >
        Works
      </H3>
      <ProjectsContentContainer>
        <ProjectsGridContainer>
          <ProjectsGrid>
            {projects?.map((project) => (
              <ProjectCard
                key={`${getProjectId(project)}-1`}
                project={project}
              />
            ))}
            {projects?.map((project) => (
              <ProjectCard
                key={`${getProjectId(project)}-2`}
                project={project}
              />
            ))}
            {projects?.map((project) => (
              <ProjectCard
                key={`${getProjectId(project)}-3`}
                project={project}
              />
            ))}
          </ProjectsGrid>
          <ProjectDetailsPlaceholder
            isDetailsExpanded={isDetailsExpanded}
          ></ProjectDetailsPlaceholder>
        </ProjectsGridContainer>
        <ProjectDetailsContainer isDetailsExpanded={isDetailsExpanded}>
          <FeaturedProject project={projects[0]} />
        </ProjectDetailsContainer>
      </ProjectsContentContainer>
    </div>
  );
}
