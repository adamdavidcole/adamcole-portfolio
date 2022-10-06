import styled from "styled-components";
import { SPACING_PX } from "../utility/style-constants";

import {
  getProjectTitle,
  getProjectSubtitle,
  getProjectTextEl,
  getProjectKeywords,
  getProjectImageURLs,
} from "../data/data-selectors";
import { H2, H3, H4, Body } from "../utility/typography";

function FeaturedProject({ project }) {
  return (
    <div>
      <div>
        {getProjectImageURLs(project)?.map((imageURL) => (
          <img key={imageURL} src={imageURL} />
        ))}
      </div>
      <H3>{getProjectTitle(project)}</H3>
      <H4 fontWeight={400}>{getProjectSubtitle(project)}</H4>
      <Body>
        <div>{getProjectTextEl(project)}</div>
        <div>
          <strong>Tools:</strong> {getProjectKeywords(project)?.join(", ")}
        </div>
      </Body>
    </div>
  );
}

const FeaturedProjectsContainer = styled.div`
  margin: 0 ${SPACING_PX[250]};
`;

export default function FeaturedProjects({ featuredProjects = [] } = {}) {
  return (
    <FeaturedProjectsContainer>
      <H2>Featured Projects</H2>
      {featuredProjects.map((project) => (
        <FeaturedProject key={project._id} project={project} />
      ))}
    </FeaturedProjectsContainer>
  );
}
