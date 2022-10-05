import styled from "styled-components";

export default function Banner() {
  const BannerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;

  const Letter = styled.span`
    font-size: 60vh;
  `;

  return (
    <BannerContainer>
      <Letter>A</Letter>
      <Letter>C</Letter>
    </BannerContainer>
  );
}
