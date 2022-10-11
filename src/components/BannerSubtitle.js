import styled from "styled-components";
import { H3 } from "../utility/typography";
import { device, margins } from "../utility/style-constants";

const BannerSubtitleContainer = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #030303;
  margin: 0 ${margins.small} ${margins.small};
  padding-bottom: ${margins.medium};

  @media ${device.tablet} {
    margin: 0 ${margins.large} ${margins.large};
  }
`;

const dividerFontSize = 60;
const BannerSubtitleDivider = styled.span`
  font-size: ${dividerFontSize}px;
  position: relative;
  top: 10px;
`;

export default function BannerSubtitle() {
  return (
    <div>
      <H3 fontWeight={400}>
        <BannerSubtitleContainer>
          <span>Artist</span>
          <BannerSubtitleDivider>·</BannerSubtitleDivider>
          <span>Technologist</span>
          <BannerSubtitleDivider>·</BannerSubtitleDivider>
          <span>AI</span>{" "}
        </BannerSubtitleContainer>
      </H3>
    </div>
  );
}
