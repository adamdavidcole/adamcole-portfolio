import styled from "styled-components";
import { FONT_SIZE } from "../utility/style-constants";

const BannerSubtitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: ${FONT_SIZE.subheader};
`;

const dividerFontSize = 60;
const BannerSubtitleDivider = styled.span`
  font-size: ${dividerFontSize}px;
  height: ${dividerFontSize}px;
`;

export default function BannerSubtitle() {
  return (
    <BannerSubtitleContainer>
      <span>Artist</span>
      <BannerSubtitleDivider>·</BannerSubtitleDivider>
      <span>Technologist</span>
      <BannerSubtitleDivider>·</BannerSubtitleDivider>
      <span>AI</span>
    </BannerSubtitleContainer>
  );
}
