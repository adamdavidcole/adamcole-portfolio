import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  getProjectThumbnailImageURL,
  getProjectId,
  getProjectURL,
} from "../data/data-selectors";
import { FeaturedProject } from "./FeaturedProjects";
import ProjectThumbnail from "./ProjectThumbnail";

import { color, device, margins, SPACING_PX } from "../utility/style-constants";
import { H3, H2, Caption } from "../utility/typography";

const animationSpeed = "0.25s";
const expansionWidth = 80;

const ProjectsPageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const ProjectsGridContainer = styled.div`
  display: flex;
`;

const ProjectsGrid = styled.div`
  overflow: scroll;
  max-height: 100%;

  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;

  max-width: 1600px;
  display: grid;
  gap: 2rem;

  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: min-content;

  margin: 0 ${margins.small};

  @media ${device.tablet} {
    margin: 0 ${margins.large};
  }
`;

const ProjectCardContainer = styled.div`
  width: 100%;
`;

const ProjectDetailsContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100vw;
  overflow: scroll;
  top: ${(props) => (props.isDetailsExpanded ? "0" : "100%")};
  transition: top ${animationSpeed} ease;
  background: white;
  opacity: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectDetailsNavigation = styled(Caption)`
  align-self: flex-start;
  z-index: 1;

  display: flex;
  background: white;
  align-items: center;

  margin: 0 ${margins.small};

  @media ${device.tablet} {
    margin: 0 ${margins.large};
  }
`;

const ProjectDetailsNavigationButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    color: ${color.blue};
  }
`;

const ProjectDetailsNavigationSpacer = styled.span`
  margin: 0 ${SPACING_PX[100]};
  font-size: 1rem;
  line-height: 1rem;
`;

const ProjectContentContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  background: white;
  opacity: ${(props) => (props.fadeOut ? "0" : "1")};
  transition: opacity ${animationSpeed} ease;
`;

function ProjectCard({ project }) {
  const projectURL = getProjectURL(project);

  return (
    <ProjectCardContainer>
      <Link to={`/projects/${projectURL}`}>
        <ProjectThumbnail project={project} />
      </Link>
    </ProjectCardContainer>
  );
}

function getExpandedProject(projects, projectId) {
  return projects.find((project) => getProjectURL(project) === projectId);
}

function getAdjacentProjects(projects, projectId) {
  if (!projects || !projectId) return {};

  const currProjectIndex = projects?.findIndex(
    (project) => getProjectURL(project) === projectId
  );

  let prevProjectIndex = currProjectIndex - 1;
  if (prevProjectIndex < 0) prevProjectIndex = projects.length - 1;

  let nextProjectIndex = currProjectIndex + 1;
  if (nextProjectIndex >= projects.length) nextProjectIndex = 0;

  const prevProject = projects[prevProjectIndex];
  const currProject = projects[currProjectIndex];
  const nextProject = projects[nextProjectIndex];

  return { prevProject, currProject, nextProject };
}

export default function Projects({ projects }) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(!!projectId);
  const [fadeOut, setFadeOut] = useState(false);
  useState(false);

  function onClose() {
    setIsDetailsExpanded(false);
    setTimeout(() => {
      //   setIsAnimatingProjectSlider(false);
      navigate(`/projects`);
    }, 250);
  }

  function goPreviousProject() {
    setFadeOut(true);
    setTimeout(() => {
      const prevProjectURL = getProjectURL(prevProject);
      navigate(`/projects/${prevProjectURL}`);
    }, 250);
  }

  function goNextProject() {
    setFadeOut(true);
    setTimeout(() => {
      const nextProjectURL = getProjectURL(nextProject);
      navigate(`/projects/${nextProjectURL}`);
    }, 250);
  }

  const { prevProject, currProject, nextProject } = getAdjacentProjects(
    projects,
    projectId
  );

  const expandedProject = isDetailsExpanded && currProject;

  console.log("expandedProject", expandedProject);
  useEffect(() => {
    setIsDetailsExpanded(!!projectId);
    setTimeout(() => {
      setFadeOut(false);
    }, 0);
  }, [projectId]);

  return (
    <ProjectsPageContainer>
      <ProjectsGrid>
        {projects?.map((project) => (
          <ProjectCard key={`${getProjectId(project)}`} project={project} />
        ))}
      </ProjectsGrid>
      <ProjectDetailsContainer isDetailsExpanded={isDetailsExpanded}>
        <ProjectDetailsNavigation>
          <ProjectDetailsNavigationButton onClick={() => goPreviousProject()}>
            {"Previous"}
          </ProjectDetailsNavigationButton>
          <ProjectDetailsNavigationSpacer>{""}</ProjectDetailsNavigationSpacer>
          <ProjectDetailsNavigationButton onClick={() => goNextProject()}>
            {"Next"}
          </ProjectDetailsNavigationButton>
          <ProjectDetailsNavigationSpacer>{""}</ProjectDetailsNavigationSpacer>
          <ProjectDetailsNavigationButton onClick={() => onClose()}>
            {"Close"}
          </ProjectDetailsNavigationButton>{" "}
        </ProjectDetailsNavigation>
        <ProjectContentContainer fadeOut={fadeOut}>
          <FeaturedProject project={currProject} />
        </ProjectContentContainer>
      </ProjectDetailsContainer>
    </ProjectsPageContainer>
  );
}
