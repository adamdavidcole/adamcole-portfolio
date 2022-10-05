import styled from "styled-components";
import { FONT_SIZE } from "../utility/style-constants";

export default function BannerSubtitle() {
  const BannerSubtitle = styled.div`
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

  return (
    <BannerSubtitle>
      <span>Artist</span>
      <BannerSubtitleDivider>·</BannerSubtitleDivider>
      <span>Technologist</span>
      <BannerSubtitleDivider>·</BannerSubtitleDivider>
      <span>AI</span>
    </BannerSubtitle>
  );
}
