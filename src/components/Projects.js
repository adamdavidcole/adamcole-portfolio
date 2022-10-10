import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  getProjectThumbnailImageURL,
  getProjectId,
  getProjectURL,
} from "../data/data-selectors";
import { FeaturedProject } from "./FeaturedProjects";

import { H3, H2 } from "../utility/typography";

const animationSpeed = "0.25s";
const expansionWidth = 80;

const ProjectsPageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const ProjectsGridContainer = styled.div`
  display: flex;
`;

const ProjectsGrid = styled.div`
  overflow: scroll;
  height: 100%;

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
  height: 100%;
  width: 100vw;
  overflow: scroll;
  top: ${(props) => (props.isDetailsExpanded ? "0" : "100%")};
  transition: top ${animationSpeed} ease;
  background: white;
`;

const ProjectDetailsNavigation = styled.div`
  position: fixed;
  z-index: 1;
`;

const ProjectContentContainer = styled.div`
  margin-top: 40px;
  left: 0;
  transition: ${(props) =>
    props.isAnimatingProjectSlider ? `left ${animationSpeed} ease` : "none"};
  background: white;
`;

const PrevProjectContentContainer = styled(ProjectContentContainer)`
  left: ${(props) => (props.show ? "0" : "-100%")};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const NextProjectContentContainer = styled(ProjectContentContainer)`
  left: ${(props) => (props.show ? "0" : "100%")};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
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
  const [showPreviousProject, setShowPreviousProject] = useState(false);
  const [isAnimatingProjectSlider, setIsAnimatingProjectSlider] =
    useState(false);

  function onClose() {
    navigate("/projects");
  }

  function goPreviousProject() {
    setShowPreviousProject(true);
    setIsAnimatingProjectSlider(true);
    setTimeout(() => {
      setIsAnimatingProjectSlider(false);

      const prevProjectURL = getProjectURL(prevProject);
      navigate(`/projects/${prevProjectURL}`);
    }, 250);
  }

  const { prevProject, currProject, nextProject } = getAdjacentProjects(
    projects,
    projectId
  );

  const expandedProject = isDetailsExpanded && currProject;

  console.log("expandedProject", expandedProject);
  useEffect(() => {
    setShowPreviousProject(false);
    setIsDetailsExpanded(!!projectId);
  }, [projectId]);

  return (
    <ProjectsPageContainer>
      <ProjectsGrid>
        {projects?.map((project) => (
          <ProjectCard key={`${getProjectId(project)}-1`} project={project} />
        ))}
        {projects?.map((project) => (
          <ProjectCard key={`${getProjectId(project)}-2`} project={project} />
        ))}
        {projects?.map((project) => (
          <ProjectCard key={`${getProjectId(project)}-3`} project={project} />
        ))}
      </ProjectsGrid>
      <ProjectDetailsContainer isDetailsExpanded={isDetailsExpanded}>
        <ProjectDetailsNavigation>
          <button onClick={() => goPreviousProject()}>Previous Project</button>{" "}
          |<button onClick={() => onClose()}>Close</button> |
          <Link to={`/projects/${getProjectURL(nextProject)}`}>
            Next Project
          </Link>
        </ProjectDetailsNavigation>

        <PrevProjectContentContainer
          show={showPreviousProject}
          isAnimatingProjectSlider={isAnimatingProjectSlider}
        >
          {prevProject && <FeaturedProject project={prevProject} />}
        </PrevProjectContentContainer>

        <ProjectContentContainer>
          {expandedProject && (
            <FeaturedProject
              project={expandedProject}
              isAnimatingProjectSlider={isAnimatingProjectSlider}
            />
          )}
        </ProjectContentContainer>

        <NextProjectContentContainer>
          {nextProject && (
            <FeaturedProject
              project={nextProject}
              isAnimatingProjectSlider={isAnimatingProjectSlider}
            />
          )}
        </NextProjectContentContainer>
      </ProjectDetailsContainer>
    </ProjectsPageContainer>
  );
}
