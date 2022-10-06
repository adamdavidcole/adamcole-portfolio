import styled from "styled-components";
import { SPACING_PX } from "../utility/style-constants";

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Letter = styled.span`
  font-size: 60vh;
`;

export default function Banner() {
  return (
    <BannerContainer>
      <Letter>A</Letter>
      <Letter>C</Letter>
    </BannerContainer>
  );
}
