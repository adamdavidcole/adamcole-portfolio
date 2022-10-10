import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getProjectThumbnailImageURL,
  getProjectId,
  getProjectURL,
} from "../data/data-selectors";
import { FeaturedProject } from "./FeaturedProjects";

import { H3, H2 } from "../utility/typography";

const animationSpeed = "0.25s";
const expansionWidth = 80;

const ProjectsGridContainer = styled.div`
  display: flex;
`;

const ProjectsContentContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

// const ProjectDetailsPlaceholder = styled.div`
//   flex-shrink: 0;
//   width: ${(props) =>
//     props.isDetailsExpanded ? `${expansionWidth}vw` : "0vw"};
//   transition: width ${animationSpeed} ease;
//   border: 1px solid;
// `;

const ProjectsGrid = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;

  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;

  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
  width: 100vw;
  left: ${(props) => (props.isDetailsExpanded ? "0" : "100%")};
  transition: left ${animationSpeed} ease;
  background: white;
`;

function ProjectCard({ project }) {
  const projectURL = getProjectURL(project);
  console.log("projectURL", projectURL);

  const thumbnailImageURL = getProjectThumbnailImageURL(project);
  return (
    <ProjectCardContainer>
      <Link to={`/projects/${projectURL}`}>
        <ProjectCardImg src={thumbnailImageURL} alt="" />
      </Link>
    </ProjectCardContainer>
  );
}

function getExpandedProject(projects, projectId) {
  return projects.find((project) => getProjectURL(project) === projectId);
}

export default function Projects({ projects }) {
  const { projectId } = useParams();
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(!!projectId);
  const expandedProject =
    isDetailsExpanded && getExpandedProject(projects, projectId);
  console.log("expandedProject", expandedProject);
  useEffect(() => {
    setIsDetailsExpanded(!!projectId);
  }, [projectId]);

  return (
    <div>
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
        </ProjectsGridContainer>
        <ProjectDetailsContainer isDetailsExpanded={isDetailsExpanded}>
          <Link to="/projects">X</Link>
          <FeaturedProject project={expandedProject} />
        </ProjectDetailsContainer>
      </ProjectsContentContainer>
    </div>
  );
}
