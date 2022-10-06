import styled from "styled-components";
import { H3 } from "../utility/typography";

const BannerSubtitleContainer = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
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
      <hr />
      <H3 fontWeight={400}>
        <BannerSubtitleContainer>
          <span>Artist</span>
          <BannerSubtitleDivider>·</BannerSubtitleDivider>
          <span>Technologist</span>
          <BannerSubtitleDivider>·</BannerSubtitleDivider>
          <span>AI</span>{" "}
        </BannerSubtitleContainer>
      </H3>
      <hr />
    </div>
  );
}
