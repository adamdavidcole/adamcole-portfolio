import styled from "styled-components";
import { useEffect, useState } from "react";
import { SPACING_PX } from "../utility/style-constants";
import getVimeoEmbed from "../utility/get-vimeo-embed";

import {
  getProjectTitle,
  getProjectSubtitle,
  getProjectTextEl,
  getProjectKeywords,
  getProjectImageURLs,
  getProjectVideoLinks,
} from "../data/data-selectors";
import { H2, H3, H4, Body } from "../utility/typography";

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
`;

const DescriptionBody = styled(Body)`
  margin-top: 2rem;
`;

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

  return (
    <div>
      <VisualContent>
        {videoEmbed && (
          <VisualContentElement
            dangerouslySetInnerHTML={{ __html: videoEmbed }}
          />
        )}
        <VisualContentElement>
          {getProjectImageURLs(project)?.map((imageURL) => (
            <VisualContentImg key={imageURL} src={imageURL} alt={""} />
          ))}
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
